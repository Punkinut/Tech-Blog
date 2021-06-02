module.exports = {
    format_time: (date) => {
      const day = date.getDay();
      const month = date.toLocaleString('en-us', { month: 'short' });;
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    },
  };