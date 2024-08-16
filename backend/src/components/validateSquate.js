const validateSquat = (landmarks,setFeedback, setMess, setCount, setRep) => {
    const requiredLandmarks = [11,23, 25, 27];
    for (let i of requiredLandmarks) {
      if (!landmarks[i] || landmarks[i].visibility < 0.5) {
        console.warn('Required landmarks are not detected or not visible');
        setFeedback('Required landmarks are not detected or not visible.');
        return false;
      }
    }
    const hip = landmarks[23]; // Left hip
    const knee = landmarks[25]; // Left knee
    const ankle = landmarks[27]; // Left ankle
     const shoulder=landmarks[11]//left shoulder
    // Function to calculate the angle between three points
    const calculateKneeAngle = (hip, knee, ankle) => {
      const vector1 = {  x: hip.x - knee.x, y: hip.y - knee.y };
      const vector2 = { x: ankle.x - knee.x, y: ankle.y - knee.y };
      const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
      const magnitude1 = Math.sqrt(vector1.x ** 2 + vector1.y ** 2);
      const magnitude2 = Math.sqrt(vector2.x ** 2 + vector2.y ** 2);
      const cosTheta = dotProduct / (magnitude1 * magnitude2);
      const angle = Math.acos(cosTheta) * (180 / Math.PI);
      return angle;
    };
    const calculateBackAngle=(hip,knee,shoulder)=>{
      const vector1={x:shoulder.x-hip.x,y:shoulder.y-hip.y};
      const vector2={x:knee.x-hip.x,y:knee.y-hip.y};
      const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
      const magnitude1 = Math.sqrt(vector1.x ** 2 + vector1.y ** 2);
      const magnitude2 = Math.sqrt(vector2.x ** 2 + vector2.y ** 2);
      const cosTheta = dotProduct / (magnitude1 * magnitude2);
      const angle = Math.acos(cosTheta) * (180 / Math.PI);
      return angle;
    }
    // Function to calculate the distance between two points
    const calculateDistance = (point1, point2) => {
      return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
    };

    // Calculate angles and depth
    const kneeAngle = calculateKneeAngle(hip, knee, ankle);
    const squatDepth = calculateDistance(hip, { x: hip.x, y: ankle.y }); // Using ankle's y-coordinate for the floor
    
    // Define thresholds
    const angleThreshold = 90; // Degrees
    const depthThreshold = 50; // Pixels or any appropriate unit based on your setup

    // Validate
    const isAngleCorrect = kneeAngle <= angleThreshold;
    const isDepthCorrect = squatDepth <= depthThreshold;
     const back=calculateBackAngle(hip,knee,shoulder);
     console.log(back);
     
    if (!isAngleCorrect) {
      setCount(1);
      setFeedback('Your knee angle is too high. Lower your hips more.');
    } else if (!isDepthCorrect) {
      setFeedback('Your squat depth is insufficient. Go lower.');
    }
    else if(back<50){
      setFeedback('Dont bend your back too much');
    }
     else {
      setCount((prevCount) => {
        if (prevCount === 1) {
           setRep((prevRep) => prevRep + 1);
          return 0;
        }
        return prevCount;
      });
      setMess('Good')
      setFeedback('Squat is in correct form.');
    }

    return isAngleCorrect && isDepthCorrect;
  };
  export default validateSquat;