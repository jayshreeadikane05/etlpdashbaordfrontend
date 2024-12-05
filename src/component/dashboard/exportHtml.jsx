import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const exportHtml = () => {
  emailEditorRef.current.editor.exportHtml((data) => {
    const { design, html } = data;

    const zip = new JSZip();

    zip.file('design.html', html);

    const imageUrls = design.body?.rows?.flatMap(row => row?.cells?.map(cell => cell?.imageSrc)) || [];
    const imagePromises = imageUrls.map((url, index) =>
      axios.get(url, { responseType: 'blob' }).then(response => {
        const imageName = `image_${index + 1}.jpg`; 
        zip.file(imageName, response.data); 
      })
    );

    // Wait for all image downloads to finish
    Promise.all(imagePromises)
      .then(() => {
        // Generate the zip file and download it
        zip.generateAsync({ type: 'blob' }).then((content) => {
          saveAs(content, 'design.zip'); // Trigger the download
        });
      })
      .catch((error) => {
        console.error('Error downloading images:', error);
      });
  });
};
