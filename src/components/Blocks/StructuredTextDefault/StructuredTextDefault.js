import React from 'react';
import { StructuredText } from 'react-datocms';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import Accordion from '../../Blocks/Accordion/Accordion';
import EmbedIframe from '../../Blocks/EmbedIframe/EmbedIframe';
import Video from '../Video/Video';
import Table from '../Table/Table';

const StructuredTextDefault = ({ content }) => {
  return (
    <StructuredText
      data={content}
      renderBlock={({ record }) => {
        console.log('Record name: ', record.__typename);

        switch (record.__typename) {
          case 'DatoCmsImage':
            return <ImageWrapper image={record.image} />;
          case 'DatoCmsEmbedIframe':
            return <EmbedIframe content={record} />;
          case 'DatoCmsTableBlock':
            return <Table content={record} />;
          case 'DatoCmsVideoBlock':
            return <Video content={record} />;
          case 'DatoCmsAcordion':
            // return <Accordion content={record}>;
            return <>accordion here...</>;

          default:
            return null;
        }
      }}
    />
  );
};

export default StructuredTextDefault;
