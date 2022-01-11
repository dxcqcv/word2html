import React, {
  FC,
  useState,
  useEffect,
  useRef,
  DragEvent,
  ChangeEvent,
} from 'react';
import * as mammoth from 'mammoth/mammoth.browser.js';
import JsZip from 'jszip';
import FileSaver from 'file-saver';
import { generateHtml } from './template';
import {
  UploadAreaStyles,
  PopupBoxStyles,
  ActionStyles,
  WrapStyles,
  FormStyles,
  SvgStyles,
  ContainerStyles,
  TableStyles,
} from '@/styles/upload';

interface ILine {
  handlePreview: (
    file: Blob,

    curTitle: string,
    curFileName: string
  ) => void;
  handleDownload: (
    file: Blob,

    curTitle: string,
    curFileName: string
  ) => void;
  data: File;
}
const Line: FC<ILine> = ({ handlePreview, handleDownload, data }) => {
  const [curTitle, setCurTitle] = useState<string>('');
  const [curFileName, setCurFileName] = useState<string>('');

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setCurTitle(e.target.value);
  };
  const handleFileName = (e: ChangeEvent<HTMLInputElement>) => {
    setCurFileName(e.target.value);
  };
  return (
    <>
      <td>
        <span>{data.name}</span>{' '}
      </td>
      <td>
        <input value={curTitle} onChange={handleTitle} />
      </td>
      <td>
        <input value={curFileName} onChange={handleFileName} />
      </td>
      <ActionStyles
        onClick={handlePreview.bind(this, data, curTitle, curFileName)}
      >
        预览!
      </ActionStyles>
      <ActionStyles
        onClick={handleDownload.bind(this, data, curTitle, curFileName)}
      >
        下载!
      </ActionStyles>
    </>
  );
};

const Home: FC = () => {
  const [previewData, setPreviewData] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [tableContents, setTableContents] = useState<File[]>([]);
  const [showPopupBox, setShowPopupBox] = useState<boolean>(false);
  const isDownload = useRef<boolean>(false);
  const formRef = useRef(null);

  // 检查浏览器是否支持拖拽
  const isAdvancedUpload = (function () {
    const div = document.createElement('div');
    return (
      ('draggable' in div || ('ondragstart' in div && 'ondrop' in div)) &&
      'FormData' in window &&
      'FileReader' in window
    );
  })();

  useEffect(() => {
    console.log('check isAdvancedUpload ', isAdvancedUpload);
  }, []);

  /**
   * 转换words到html
   * @param arrayBuffer words 内容
   */
  const handleFileReader = (
    curTitle: string,
    curFileName: string,
    arrayBuffer: string | ArrayBuffer
  ) => {
    mammoth
      .convertToHtml(
        { arrayBuffer: arrayBuffer },
        {
          convertImage: mammoth.images.imgElement(checkImg),
        }
      )
      .then(displayResult.bind(this, curTitle, curFileName))
      .done();
  };

  /**
   * 检查上传文件类型
   * @param list 上传文件列表
   */
  const checkIsWords = (list: File[]): boolean => {
    const isWords = list.every(
      (file) =>
        file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    return isWords;
  };
  /**
   * 处理文件上传
   * @param event 上传事件
   */
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('check files type', event?.target?.files);

    const nameList = Array.from(event?.target?.files);

    const isWords = checkIsWords(nameList);

    if (isWords === false) {
      alert('只支持words文件');
      return;
    }
    setTableContents(nameList);
  };

  interface Iimage {
    altText: string;
    contentType: string;
    read: (arg: string) => Promise<string>;
    type: string;
  }
  /**
   * 处理图片
   * @param image 图片对象
   * @returns 组合成base64
   * // TODO 抽成独立图片
   */
  const checkImg = (image: Iimage) => {
    alert('包含图片会使html文件过大，请注意！！！');
    return image.read('base64').then(function (imageBuffer) {
      return {
        src: 'data:' + image.contentType + ';base64,' + imageBuffer,
      };
    });
  };

  /**
   * 读取文件流
   * @param callback 回调函数
   * @param data 数据流
   */
  const readFileInputEventAsArrayBuffer = (
    callback: (arg: string | ArrayBuffer) => void,
    data: Blob
  ): Promise<string | ArrayBuffer> => {
    return new Promise((res, rej) => {
      const file = data;

      const reader = new FileReader();

      reader.onload = function (loadEvent) {
        const arrayBuffer = loadEvent.target.result;
        callback(arrayBuffer);
        res(arrayBuffer);
      };

      reader.onerror = function (error) {
        console.log('show err', error);
        rej(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  /**
   * 生成html并打包
   * @param blob 内容数据流
   */
  const exportZip = (blob: string, curFileName: string) => {
    const zip = JsZip();
    // TODO sep images
    zip.file(`${curFileName}.html`, blob);
    zip.generateAsync({ type: 'blob' }).then((zipFile) => {
      const currentDate = new Date().getTime();
      const fileName = `combined-${currentDate}.zip`;
      return FileSaver.saveAs(zipFile, fileName);
    });
  };
  const displayResult = (
    curTitle: string,
    curFileName: string,
    result: { value: string; messages: string }
  ) => {
    const realHtml = generateHtml({ content: result.value, title: curTitle });
    setPreviewData(result.value);

    console.log('check isDownload ', isDownload.current);
    isDownload.current && exportZip(realHtml, curFileName);
  };

  const preventDefault = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent<HTMLFormElement>) => {
    preventDefault(e);
    setIsDragOver(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLFormElement>) => {
    preventDefault(e);
    setIsDragOver(false);
  };
  const handleDrop = (e: DragEvent<HTMLFormElement>) => {
    handleDragLeave(e);
    const nameList = Array.from(e.dataTransfer.files);

    const isWords = checkIsWords(nameList);

    if (isWords === false) {
      alert('只支持words文件');
      return;
    }

    setTableContents(nameList);
  };
  /**
   * 处理下载
   * @param file 文件流
   */
  const handleDownload = (
    file: Blob,
    curTitle: string,
    curFileName: string
  ) => {
    if (!curFileName || !curTitle) {
      alert('请填写标题和下载文件名');
      return;
    }
    isDownload.current = true;
    console.log('download');
    readFileInputEventAsArrayBuffer(
      handleFileReader.bind(this, curTitle, curFileName),
      file
    );
  };
  const handlePreview = async (
    file: Blob,
    curTitle: string,
    curFileName: string
  ) => {
    try {
      isDownload.current = false;
      await readFileInputEventAsArrayBuffer(
        handleFileReader.bind(this, curTitle, curFileName),
        file
      );
      setShowPopupBox(true);
    } catch (error) {
      console.log('preview error', error);
    }
  };

  const handleClose = () => {
    setShowPopupBox(false);
  };

  return (
    <>
      <PopupBoxStyles onClick={handleClose} showPopupBox={showPopupBox}>
        <div className="box">
          <div className="inner">
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: previewData }}
            />
            <span onClick={handleClose}>X</span>
          </div>
        </div>
      </PopupBoxStyles>
      <ContainerStyles>
        <WrapStyles>
          <TableStyles>
            <thead>
              <tr>
                <th>word文件名</th>
                <th>html标题</th>
                <th>html文件名</th>
                <th>预览</th>
                <th>下载</th>
              </tr>
            </thead>
            <tbody>
              {tableContents.map((data, index) => {
                return (
                  <tr key={`${index}-${data.name}`}>
                    <Line
                      data={data}
                      handleDownload={handleDownload}
                      handlePreview={handlePreview}
                    />
                  </tr>
                );
              })}
            </tbody>
          </TableStyles>
        </WrapStyles>

        <FormStyles
          ref={formRef}
          isDragOver={isDragOver}
          onDragOver={handleDragEnter}
          onDragEnter={handleDragEnter}
          onDragEnd={handleDragLeave}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          encType="multipart/form-data"
        >
          <div>
            <UploadAreaStyles htmlFor="file">
              <SvgStyles
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="43"
                viewBox="0 0 50 43"
              >
                <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path>
              </SvgStyles>
              <input
                onChange={handleFileSelect}
                id="file"
                type="file"
                multiple
              />
              <div>
                <strong>点击上传</strong>
                <span> 或将文件拖拽至此</span>.
              </div>
            </UploadAreaStyles>
          </div>
        </FormStyles>
      </ContainerStyles>
    </>
  );
};

export default Home;
