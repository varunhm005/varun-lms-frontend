import { Button, Spin, Upload, UploadFile } from 'antd';
// import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { storage } from '../../configs/firebase';
import { Permissions } from '../../configs/permissions';
import { queryKeys } from '../../constants/query-keys';
import {
  useCreateCourseResourceMutation,
  useGetCourseLevelResourcesQuery,
  useRemoveCourseResourceMutation,
} from '../../graphql/@generated/graphql';
import { useGetUserPermissions } from '../../hooks/auth-hook';
import { showErrorMessage } from '../../utils/utils';

interface Props {
  levelId: string;
  courseId: string;
  readonly?: boolean;
}

function CourseResources(props: Props) {
  const permissions = useGetUserPermissions();

  const [setUploading, setSetUploading] = useState(false);

  const [createResources, { loading: createResourcesLoading }] = useCreateCourseResourceMutation({
    onError: showErrorMessage,
    refetchQueries: [queryKeys.GetCourseDetails, queryKeys.GetCourseLevelResources],
  });

  const { levelId, courseId, readonly } = props;

  const { data: levelData, loading } = useGetCourseLevelResourcesQuery({
    variables: {
      courseLevelId: +levelId,
    },
  });

  const handleFileChange = async (info: { file: UploadFile }) => {
    setSetUploading(true);
    const { file } = info;

    try {
      // TODO: upload file to firebase storage path change to course id
      const imagesRef = ref(storage, `user_images/${file.name}`);
      await uploadBytes(imagesRef, file as unknown as File);
      const url = await getDownloadURL(imagesRef);

      createResources({
        variables: {
          createCourseResourceInput: {
            url,
            coursesId: +courseId,
            memeType: file.type!,
            name: file.name,
            courseLevelId: +levelId,
          },
        },
      });
    } catch (error) {
      showErrorMessage(error);
    } finally {
      setSetUploading(false);
    }
  };

  const [removeCourseResource, { loading: removeCourseResourceLoading }] =
    useRemoveCourseResourceMutation({
      refetchQueries: [queryKeys.GetCourseDetails, queryKeys.GetCourseLevelResources],
    });

  const handleRemoveFile = async (file: UploadFile) => {
    if (file.status === 'done') {
      removeCourseResource({
        variables: {
          removeCourseResourceId: +file.uid,
        },
      });
    }
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    const data = levelData?.courseLevel?.resources?.map((resource) => {
      const res: UploadFile = {
        uid: resource!.id!,
        name: resource!.name,
        status: 'done',
        url: resource!.url,
      };
      return res;
    });
    setFileList(data || []);
  }, [levelData]);

  const uploadRef = React.useRef<any>();

  return (
    <Spin spinning={loading}>
      <div>
        <p className="mb-2 mt-4 text-base">Resources:</p>
        <div className="max-w-2xl text-left">
          <Spin spinning={removeCourseResourceLoading || createResourcesLoading || setUploading}>
            <Upload
              ref={uploadRef}
              name="url"
              listType="picture"
              fileList={[...fileList]}
              onRemove={handleRemoveFile}
              beforeUpload={async (file) => {
                setFileList([...fileList, file]);
                handleFileChange({ file });
                return false;
              }}
              showUploadList={{
                showRemoveIcon: readonly !== true,
              }}
              onPreview={(file) => {
                window.open(file.url, '_blank');
              }}
              multiple={false}
              maxCount={1}
            >
              {readonly !== true && permissions.includes(Permissions.CREATE_RECOURSE) && (
                <Button shape="round" className="mt-2" type="primary">
                  Upload File
                </Button>
              )}
            </Upload>
          </Spin>
        </div>
      </div>
    </Spin>
  );
}
export default CourseResources;

CourseResources.defaultProps = {
  readonly: false,
};
