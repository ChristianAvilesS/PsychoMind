
function descargarPDF1() {
    const url = 'assets/documents/transtorno_depresivo_mayor.pdf'; 
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'Transtorno_depresivo_mayor.pdf'; 
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}