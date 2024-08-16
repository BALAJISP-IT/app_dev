const validateBicepCurl = (results,setFeedback,setMess,setCount,setRep) => {
    const requiredLandmarks = [11, 13, 15]; // Left shoulder, left elbow, left wrist
  for (let i of requiredLandmarks) {
    if (!results.poseLandmarks[i]|| results.poseLandmarks[i].visibility < 0.5) {
      console.warn('Required landmarks are not detected');
      setFeedback('Required landmarks are not detected');
      return;
    }
  }
  const hip=results.poseLandmarks[23]//left hip
  const knee = results.poseLandmarks[25]; // Left knee
  const shoulder = results.poseLandmarks[11]; // Left shoulder
  const elbow = results.poseLandmarks[13]; // Left elbow
  const wrist = results.poseLandmarks[15]; // Left wrist
  // Function to calculate the angle between three points
  const calculateAngle = (point1, point2, point3) => {
    const vector1 = { x: point1.x - point2.x, y: point1.y - point2.y };
    const vector2 = { x: point3.x - point2.x, y: point3.y - point2.y };
    const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
    const magnitude1 = Math.sqrt(vector1.x ** 2 + vector1.y ** 2);
    const magnitude2 = Math.sqrt(vector2.x ** 2 + vector2.y ** 2);
    const cosTheta = dotProduct / (magnitude1 * magnitude2);
    const angle = Math.acos(cosTheta) * (180 / Math.PI);
    return angle;
  };
  const elbowAngle = calculateAngle(shoulder, elbow, wrist);
   const backAngle=calculateAngle(shoulder,hip,knee);
   
  const isElbowStable = (currentElbow) => {
    return currentElbow.x>hip.x;
  };


  const elbowMovementStable = isElbowStable(elbow);

  // if(!((180-backAngle)<=6))
  // {
  //     setFeedback('Keep a straight back');
  //    setCount(0);
  //   }
  //   else 
  if (!elbowMovementStable) {
      setFeedback('Elbow is moving too much.');
      return false;
    }
  else if(elbowAngle<=90)
    {
        setMess("curl down")
        setFeedback('Bicep curl is performed correctly.');
        setCount(1);
        
        return true;
    }
    else if(elbowAngle>=150)
        {
          setCount((prevCount) => {
            if (prevCount === 1) {
               setRep((prevRep) => prevRep + 1);
              return 0;
            }
            return prevCount;
          });
         //data();
            setMess("curl up");
            setFeedback('Bicep curl is performed correctly.');
            return true;
    }
   
  return false;
  };
  export default validateBicepCurl;
