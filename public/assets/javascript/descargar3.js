function descargarPDF3() {
    const url = 'assets/documents/transtorno_del_espectro_del_autismo.pdf';
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'transtorno_del_espectro_del_autismo.pdf';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
  }