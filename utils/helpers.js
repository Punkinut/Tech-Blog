module.exports = {
    format_time: (date) => {
      const day = date.getDay() - 1;
      const month = date.toLocaleString('en-us', { month: 'short' });;
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    },
  };