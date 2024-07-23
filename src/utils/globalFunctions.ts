export const setZonaColor = (color: string) => {
  let zonaColor = color.toLowerCase();
  let style;
  switch (zonaColor) {
    case 'hijau':
      style = 'text-green-500';
      break;
    case 'kuning':
      style = 'text-yellow-500';
      break;
    case 'merah':
      style = 'text-red-500';
      break;
    default:
      style = 'text-gray-500';
      break;
  }

  return style;
};

export function formatDMAC(dmac: string) {
  // Remove hyphens and ensure all characters are in uppercase
  dmac = dmac.replace(/-/g, '').toUpperCase();

  // Check if the input is already in the "DD:33:DD:33:DD:33" format
  if (/^[0-9A-F]{2}(:[0-9A-F]{2}){5}$/.test(dmac)) {
    return dmac; // Return the input as-is
  }

  // Use a regular expression to split the 12-character DMAC address into groups of two characters
  const formattedDMAC = dmac.replace(
    /(..)(..)(..)(..)(..)(..)/,
    '$1:$2:$3:$4:$5:$6'
  );

  return formattedDMAC;
}

export function formatDate(inputDate: string) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(inputDate);
  const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);
  return formattedDate;
}
