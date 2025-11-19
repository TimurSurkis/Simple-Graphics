const xMultiplier = 50;
const yMultiplier = 25;

function setCanvasSize() {
	const html = document.querySelector('html');
	const compStyles = window.getComputedStyle(html);
	const htmlFontSize = compStyles.getPropertyValue('font-size');

	const htmlFontSizeNum = Number(htmlFontSize.match(/\d+\.?\d*/g));

	const canvasX = htmlFontSizeNum * xMultiplier;
	const canvasY = htmlFontSizeNum * yMultiplier;

	return [canvasX, canvasY];
}

export default setCanvasSize;
