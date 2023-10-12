import { ThreeCircles } from 'react-loader-spinner';
import './LoadingPage.scss';

const LoadingPage = () => {
   return (
      <div className="big-loading-wrapper">
         <ThreeCircles
            height="180"
            width="180"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor="#00CED1"
            innerCircleColor="#FF1493"
            middleCircleColor="#ADFF2F"
         />
         <div className="loading-description">
            <p>
               <span className="loadspan1">L</span>
               <span className="loadspan2">o</span>
               <span className="loadspan3">a</span>
               <span className="loadspan4">d</span>
               <span className="loadspan5">i</span>
               <span className="loadspan6">n</span>
               <span className="loadspan7">g</span>
            </p>
         </div>
      </div>
   );
};

export default LoadingPage;
