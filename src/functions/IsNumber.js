export const isNumber = (evt) =>{
  evt = (evt) ? evt : window.event;
  let charCode = (evt.which) ? evt.which : evt.keyCode;
  if (evt.clipboardData){
    let textControl = evt.clipboardData.getData('text');
    if (isNaN(+textControl) || +textControl < 0){
    evt.preventDefault();;
  }
  }
  
  else if (((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) || charCode === undefined) {
    evt.preventDefault();;
  } else {
    return true;
  }
}