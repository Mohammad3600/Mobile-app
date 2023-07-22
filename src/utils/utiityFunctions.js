export const getVideoNameByPath = (videoPath) => {
    const pathArray = videoPath.split('/');
    const fileNameWithExtension = pathArray[pathArray.length - 1];
    const fileName = fileNameWithExtension.split('.')[0];
    return fileName;
}