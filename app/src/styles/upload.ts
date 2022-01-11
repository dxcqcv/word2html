import styled from 'styled-components';

export const UploadAreaStyles = styled.label`
  padding: 4rem 2rem;
  display: block;
  cursor: pointer;
`;

export const PopupBoxStyles = styled.div<{ showPopupBox: boolean }>`
  display: ${(props) => (props.showPopupBox ? 'block' : 'none')};
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  .inner {
    position: relative;
  }
  .content {
    padding: 2rem 8px;
    height: 30rem;
    width: 50rem;
    overflow: auto;

    background-color: #fff;
  }
  .box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
  span {
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    font-size: 2rem;
    position: absolute;
    right: 0.2rem;
    top: -2rem;
    z-index: 2;
  }
`;

const bb = `

  cursor: pointer;
`;
export const ActionStyles = styled.td`
  /* cursor: pointer; */
  ${bb}
`;

export const WrapStyles = styled.div`
  height: 40vh;
  overflow: auto;
  margin: 25px auto;
`;

export const TableStyles = styled.table`
  width: 100%;
  text-align: left;
  position: relative;
  font-family: 'Arial';
  border-collapse: collapse;
  border: 1px solid #eee;
  border-bottom: 2px solid #00cccc;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.05),
    0px 20px 20px rgba(0, 0, 0, 0.05), 0px 30px 20px rgba(0, 0, 0, 0.05);
  tr {
    &:hover {
      background: #f4f4f4;

      td {
        color: #555;
      }
    }
  }
  th,
  td {
    padding: 0.25rem;
    color: #999;
    border: 1px solid #eee;
    padding: 12px;
    border-collapse: collapse;
  }
  th {
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
    z-index: 1;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
  }
  td {
    position: relative;
    input {
      width: 100%;
    }
    span {
      position: absolute;
      left: 0;
      right: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  th {
    background: #00cccc;
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
    &.last {
      border-right: none;
    }
  }
`;

export const ContainerStyles = styled.div`
  height: 100vh;
  color: rgb(204, 199, 192);
  background-color: rgb(26, 41, 49);
  padding: 2rem 1.25rem;
`;

export const SvgStyles = styled.svg`
  fill: rgb(174, 167, 156);
  width: 100%;
  height: 80px;
  fill: #92b0b3;
  display: block;
  margin-bottom: 40px;
`;

const isDragOverStyles = (isDragOver: boolean) =>
  isDragOver
    ? 'outline-offset: -20px;outline-color: #c8dadf;background-color: #fff;'
    : '';

export const FormStyles = styled.form<{ isDragOver: boolean }>`
  font-size: 1.25rem; /* 20 */
  background-color: rgb(38, 59, 65);
  position: relative;
  text-align: center;

  outline-offset: -10px;
  outline: 2px dashed #92b0b3;
  outline-color: rgb(74, 80, 83);
  transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear;
  ${(props) => isDragOverStyles(props.isDragOver)}

  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  input + label {
    max-width: 80%;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;

    strong {
      font-weight: 700;
    }
    span {
      display: inline;
    }
  }
`;
