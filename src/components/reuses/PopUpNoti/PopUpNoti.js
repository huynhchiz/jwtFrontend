import './PopUpNoti.scss';

function PopUpNoti({ className, width, height, content, onClickClose }) {
   const classNames = {
      class: 'popup-noti-wrapper',
      className: className, //custom class name
   };

   const handleStopClose = (e) => {
      e.stopPropagation();
   };

   return (
      <div className="modal-popup" onClick={onClickClose}>
         <div
            className={classNames.class + ' ' + classNames.className}
            style={{ width: width + 'px', height: height + 'px' }}
            onClick={(e) => handleStopClose(e)}
         >
            <div className="popup-body">{content}</div>
            <button className="popup-close" onClick={onClickClose}>
               X
            </button>
         </div>
      </div>
   );
}

export default PopUpNoti;
