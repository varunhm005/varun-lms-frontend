import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChapterType } from '../../graphql/@generated/graphql';

function ViewChapterDoc() {
  const location = useLocation();

  const state = location.state as {
    type: ChapterType;
    url: string;
  };

  const navigate = useNavigate();

  //   Check type and url in state and render accordingly

  useEffect(() => {
    if (!state || !state.url || !state.type) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <section className="chapter-doc-container w-full p-6">
      {state.type === ChapterType.Video && <ReactPlayer url={state.url!} controls light={false} />}
      {state.type === ChapterType.Document && (
        <DocViewer
          documents={[
            {
              uri: state.url,
            },
          ]}
          pluginRenderers={DocViewerRenderers}
          prefetchMethod="GET"
          style={{
            width: '100%',
            minHeight: '70vh',
          }}
          config={{
            header: {
              disableFileName: true,
              disableHeader: true,
            },
          }}
          className="doc-viewer-no-download"
        />
      )}
    </section>
  );
}

export default ViewChapterDoc;
