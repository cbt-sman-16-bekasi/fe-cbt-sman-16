const useDate  = () => {
  const getFormattedDate = (data) => {
    if (data === '') {
      return '-';
    }

    const now = new Date(data);
    const yyyy = now.getFullYear();

    if (yyyy === 1) {
      return ''
    }
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  }

  const getFormatDate = (data) => {
    if (data === '') {
      return '-';
    }

    const now = new Date(data);
    const yyyy = now.getFullYear();

    if (yyyy === 1) {
      return ''
    }
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  }

  return {
    formattedWithTime: getFormattedDate,
    formatted: getFormatDate,
  }
}

export default useDate;