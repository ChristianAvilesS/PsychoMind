function descargarPDF() {
    const url = 'assets/documents/transtorno-obsesivo-compulsivo.pdf';
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'Trastorno-obsesivo-compulsivo.pdf';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
  }