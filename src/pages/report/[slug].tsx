/* eslint-disable react/no-unstable-nested-components */
import { Button, Card, DatePicker, Form, Input, Select, Table } from 'antd';
import { Rule } from 'antd/es/form';
import { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import XLSX from 'xlsx-js-style';
import CourseScheduleFilter from '../../components/reports/CourseScheduleFilter';
import { useMessage } from '../../context/message-context';
import {
  ReportFilterType,
  useGenerateReportLazyQuery,
  useGetReportListItemQuery,
} from '../../graphql/@generated/graphql';

type DataType = 'string' | 'number' | 'dateString';

export type ReportDataResponse = {
  title: string;
  key: string;
  value: string | number | Date;
  type: DataType;
  bgColor?: string;
  color?: string;
}[];

function ReportDetails() {
  const { slug } = useParams<{
    slug: string;
  }>();

  const reportItemQuery = useGetReportListItemQuery({
    variables: {
      slug: slug!,
    },
  });

  const message = useMessage();

  const [generateReport, { data: reportData, loading: reportDataLoading }] =
    useGenerateReportLazyQuery({
      fetchPolicy: 'cache-and-network',
      onCompleted(data) {
        // report data is empty
        if (data.generateReport?.reportData?.length === 0) {
          message.error({
            key: 'report-data-empty',
            content: 'No data found',
          });
        }
      },
    });

  const reportItemDetails = reportItemQuery.data?.reportListItem;

  const tableColumns = useMemo(() => {
    if (reportItemDetails?.columns) {
      let { columns } = reportItemDetails;

      if (reportData?.generateReport.columns) {
        columns = [...columns, ...reportData.generateReport.columns];
      }

      return columns.map((d, i) => {
        const rData = reportData?.generateReport.reportData as ReportDataResponse[];

        // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
        const _reportData = rData?.find((item) => {
          return item?.find((it) => it.key === d.key);
        });

        const col: ColumnType<unknown> = {
          dataIndex: `${d?.dataIndex}`,
          key: d.key + i,
          title: d.title,
          render: (text: string) => {
            if (!text) {
              return {
                children: text,
              };
            }

            const style: React.CSSProperties = {};

            const renderData = _reportData?.find((item) => item.key === d.key);

            let rendedText: any = text;

            if (text && d.type === 'date' && dayjs(text as string).isValid()) {
              rendedText = dayjs(text as string).format('DD MMM YYYY');
            } else if (d.type === 'html') {
              // eslint-disable-next-line react/no-danger
              rendedText = <div dangerouslySetInnerHTML={{ __html: text }} />;
            }

            if (text && renderData?.bgColor) {
              style.backgroundColor = renderData?.bgColor;
            }

            if (text && renderData?.color) {
              style.color = renderData?.color;
            }

            return {
              children: d.type === 'html' ? rendedText : <div style={style}>{rendedText}</div>,
              props: {
                style,
              },
            };
          },
        };
        return col;
      });
    }
    return [];
  }, [
    reportItemDetails,
    reportData?.generateReport.columns,
    reportData?.generateReport?.reportData,
  ]);

  const form = Form.useForm()[0];

  const courseId = form.getFieldValue('courseId');

  useEffect(() => {
    if (courseId) {
      form.setFieldsValue({
        courseLevelId: undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const tableData = useMemo(() => {
    if (reportData?.generateReport?.reportData) {
      const repData = reportData.generateReport.reportData as ReportDataResponse[];

      return repData.map((d) => {
        const obj: any = {};
        d.forEach((v) => {
          obj[v.key] = v.value;
        });
        return obj;
      });
    }
    return [];
  }, [reportData?.generateReport?.reportData]);

  // Submit form
  const onFinish = async (values: object) => {
    try {
      await generateReport({
        variables: {
          slug: slug!,
          filter: values,
        },
      });
    } catch (error) {
      message.error("Couldn't generate report");
    }
  };

  const exportReport = () => {
    const wb = XLSX.utils.book_new();

    const rows: any[] = [];

    // Create title row with proper styling
    const titleRow = tableColumns.map((d) => {
      return {
        v: d.title,
        t: 's',
        s: {
          font: {
            bold: true,
            sz: 12,
            color: { rgb: '000000' },
          },
          fill: {
            fgColor: { rgb: 'E6E6E6' },
          },
          alignment: {
            horizontal: 'center',
            vertical: 'center',
          },
          border: {
            top: { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            left: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } },
          },
        },
      };
    });

    // Process data rows with conditional styling
    tableData.forEach((d, rowIndex) => {
      const row = tableColumns.map((v) => {
        // Get the value from the data
        let value = d[v.dataIndex as string];
        const column = reportItemDetails?.columns?.find((c) => c.dataIndex === v.dataIndex);
        const dataIndexType = column?.type;

        // Format dates
        if ((value && dataIndexType === 'date') || (value && dataIndexType === 'dateString')) {
          const date = dayjs(value);
          if (date.isValid()) {
            value = new Date(value)?.toLocaleDateString();
          }
        }

        // Convert HTML to text
        if (value && dataIndexType === 'html') {
          value = value.replace(/<[^>]*>?/gm, '');
        }

        // Find style data for this cell
        const rData = reportData?.generateReport.reportData as ReportDataResponse[];
        const reportData$ = rData?.[rowIndex];
        const renderData = reportData$?.find((item) => item.key === column?.key);

        // Create cell style object
        const cellStyle: any = {
          border: {
            top: { style: 'thin', color: { rgb: 'CCCCCC' } },
            bottom: { style: 'thin', color: { rgb: 'CCCCCC' } },
            left: { style: 'thin', color: { rgb: 'CCCCCC' } },
            right: { style: 'thin', color: { rgb: 'CCCCCC' } },
          },
          alignment: {
            vertical: 'center',
            wrapText: true,
          },
        };

        // Helper function to convert RGB to hex
        const rgbToHex = (rgbString: string): string => {
          const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (!match) return '000000'; // fallback to black

          const r = parseInt(match[1], 10);
          const g = parseInt(match[2], 10);
          const b = parseInt(match[3], 10);

          // eslint-disable-next-line no-bitwise
          return ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0').toUpperCase();
        };

        // Apply background color if present
        if (renderData?.bgColor) {
          let hexColor = renderData.bgColor;

          // Convert RGB to hex if needed
          if (renderData.bgColor.startsWith('rgb(')) {
            hexColor = rgbToHex(renderData.bgColor);
          } else if (renderData.bgColor.startsWith('#')) {
            hexColor = renderData.bgColor.replace('#', '');
          }

          cellStyle.fill = {
            fgColor: { rgb: hexColor.toUpperCase() },
          };
        }

        // Apply text color if present
        if (renderData?.color) {
          let hexColor = renderData.color;

          // Convert RGB to hex if needed
          if (renderData.color.startsWith('rgb(')) {
            hexColor = rgbToHex(renderData.color);
          } else if (renderData.color.startsWith('#')) {
            hexColor = renderData.color.replace('#', '');
          }

          cellStyle.font = {
            color: { rgb: hexColor.toUpperCase() },
            sz: 10,
          };
        }

        return {
          v: value || '',
          t: 's',
          s: cellStyle,
        };
      });
      rows.push(row);
    });

    const sheetArray = [titleRow, ...rows];

    // Create worksheet with rows
    const ws = XLSX.utils.aoa_to_sheet(sheetArray);

    // Set column widths (optional)
    const colWidths = tableColumns.map(() => ({ wch: 15 }));
    ws['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Report Data');

    // Write Excel file to browser
    XLSX.writeFile(wb, `${reportItemDetails?.title}.xlsx`);
  };

  return (
    <main className="container p-6 text-left">
      {/* Filter Card */}
      <Card
        loading={reportItemQuery.loading}
        title={reportItemQuery.data?.reportListItem.title}
        className="!mb-2"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <div className="grid grid-cols-3 gap-x-5">
            {reportItemQuery.data?.reportListItem.filters?.map((d) => {
              if (d?.type === ReportFilterType.Custom) {
                if (d.name === 'courseSchedule') {
                  return <CourseScheduleFilter filter={{}} form={form} key={d.name} />;
                }

                return null;
              }

              return (
                <Form.Item label={d?.label} name={d?.name} rules={d?.rules as Rule[]} key={d?.name}>
                  {d?.type === ReportFilterType.Date && <DatePicker className="w-full" />}
                  {d?.type === ReportFilterType.YearPicker && (
                    <DatePicker picker="year" className="w-full" />
                  )}
                  {d?.type === ReportFilterType.MonthPicker && (
                    <DatePicker picker="month" className="w-full" />
                  )}
                  {d?.type === ReportFilterType.Select && (
                    <Select
                      filterOption={(input, option) => {
                        const label = `${option?.label}` as string;
                        if (label.toLowerCase().startsWith(input.toLowerCase())) {
                          return true;
                        }
                        return label.toLowerCase().includes(input.toLowerCase());
                      }}
                      showSearch
                      className="w-full"
                      options={d?.options! as any}
                      removeIcon
                    />
                  )}
                  {d?.type === ReportFilterType.Text && <Input className="w-full" />}
                </Form.Item>
              );
            })}

            <Form.Item label=" ">
              <Button loading={reportDataLoading} htmlType="submit" type="primary" block>
                Generate Report
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>

      {reportData?.generateReport?.reportData &&
        reportData?.generateReport.reportData.length > 0 && (
          <Card title="Report">
            <div className="overflow-y-auto">
              <Table
                bordered
                size="small"
                loading={reportDataLoading}
                columns={tableColumns as any}
                dataSource={tableData}
                rowKey={(record) => record.slNo}
                footer={() => (
                  <div>
                    <Button type="primary" onClick={exportReport}>
                      Download
                    </Button>
                  </div>
                )}
              />
            </div>
          </Card>
        )}
    </main>
  );
}

export default ReportDetails;
