function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Failed to copy text to clipboard!', err);
    }

    document.body.removeChild(textArea);
}

export function copyTextToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        fallbackCopyTextToClipboard(text);
    }

}

export function copyBlobToClipboard(blob) {
	if(!navigator.clipboard) return false;

	const type = blob.type;
	if(type.includes("jpg") || type.includes("jpeg")) {
		return convertToPng(blob).then(copyBlobToClipboard);
	}

    return navigator.clipboard.write([
        // eslint-disable-next-line no-undef
        new ClipboardItem({
            [blob.type]: blob
        })
    ]);
}

const createImage = (options) => {
  options = options || {};
  const img = document.createElement("img");
  if (options.src) {
    img.src = options.src;
  }
  return img;
};

function convertToPng(imgBlob) {
	return new Promise((resolve, reject) => {
		const imageUrl = window.URL.createObjectURL(imgBlob);
		  const canvas = document.createElement("canvas");
		  const ctx = canvas.getContext("2d");
		  const imageEl = createImage({ src: imageUrl });
		  imageEl.onload = (e) => {
		    canvas.width = e.target.width;
		    canvas.height = e.target.height;
		    ctx.drawImage(e.target, 0, 0, e.target.width, e.target.height);
		    canvas.toBlob(resolve, "image/png", 1);
		  }; 
	})
}

export async function blobToByteArray(blob) {
    const buffer = await blob.arrayBuffer();
    const view = new Uint8Array(buffer);
    return Array.from(view);
}