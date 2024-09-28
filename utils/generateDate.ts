import moment from "moment"
export function generateCurrentDateISO() {
    const currentDate = new Date();
    return currentDate.toISOString();
  }
  

  export const formatDate = (date: any) => {
    if (!date) return 'Nil'
    return moment.utc(date).format('DD-MMM-YY')
  }

  export const formatDateTime = (dateTime: any) => {
    if (!dateTime) return 'Nil'
    return moment(dateTime).format("MMM DD, YYYY, HH:mm:ss")
  }