import React, { useState, useEffect, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { userContext, userInfoContext } from '../context';
import { InfoModal } from './InfoModal'

export const Goal = ({ getData, historyData }) => {

  const { userInfo, setUserInfo } = useContext(userInfoContext);
  const { userId, setUserId } = useContext(userContext);

  const [goalModal, setGoalModal] = useState(false)
  const [infoModal, setInfoModal] = useState(false)
  const [newGoal, setNewGoal] = useState('')

  //console.log("historyData:", historyData)
  //console.log("userInfo:", userInfo)
  let historyCopy;
  let userInfoCopy;
  let userGoal;
  let mostRecentWeight;
  let startWeight;
  let diffFromStart;
  let diffFromGoal;
  let progressAndPlan;

  const onChange = (e) => {
    const input = e.target.value;
    setNewGoal(input);
  }

  const toggleGoalModal = () => {
    setGoalModal(!goalModal)
  }

  const toggleInfoModal = () => {
    setInfoModal(!infoModal)
  }
  
  const updateGoal = () => {
    toggleGoalModal()

    if (newGoal) {
      fetch('/newgoal', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newGoal: Number(newGoal), userId: userId })
    })
    .then(data => data.json())
    .then(data => {
      console.log('hellllooo????')
      getData();
      //console.log('data is fetched');
      })
      .catch(err => console.log("error in saving history", err));
    }
  }

  if (historyData) {
    //historyCopy = JSON.parse(JSON.stringify(historyData));
    //userInfoCopy = JSON.parse(JSON.stringify(userInfo));
    startWeight = userInfo[0].weight
    userGoal = userInfo[0].goal
    mostRecentWeight = historyData[historyData.length - 1].weight
    diffFromStart = (startWeight - mostRecentWeight).toFixed(1)
    diffFromGoal = (mostRecentWeight - userGoal).toFixed(1)
      if (mostRecentWeight == 0) {
        console.log("most recent weight is 0");
        progressAndPlan =
          <div>
            <h3 style={{ color: 'blue' }}>Please update your information</h3>
            <button onClick={toggleInfoModal}>Update</button>
            {infoModal &&
              <InfoModal
              userId={userId}
              infoModal={infoModal}
              setInfoModal={setInfoModal}
              getData={getData}
              historyData={historyData}
              />}
          </div>
          // <InfoModal />
      } else {
        console.log("most recent weight", mostRecentWeight)
        progressAndPlan =         <div>
        <div className='progress'>
          {mostRecentWeight < startWeight ? <h3>You lost <div style={{ color: 'blue' }}>{diffFromStart} lb </div> since you started.</h3> : <h3>You gain <div style={{ color: 'blue' }}>{ Math.abs(diffFromStart) } lb </div> since you started</h3>}
        </div>
        {/* <h3>{ mostRecentWeight-userGoal} lb to go. YOU GOT THIS!!</h3> */}
        <div className='plan'>
          {mostRecentWeight - userGoal > 0 ? <h3><div style={{ color: 'red' }}>{diffFromGoal} lb </div> to go. YOU GOT THIS!!</h3> : <div style={{ color: 'green' }}><h3>You reached your GOAL! GREAT JOB!</h3></div>}
        </div>
        </div>
      }  
    // diffFromStart = (startWeight - mostRecentWeight).toFixed(1)
    // diffFromGoal = (mostRecentWeight - userGoal).toFixed(1)
    //console.log(diffFromStart)
  }

  // if (historyData) {
  //   historyCopy = JSON.parse(JSON.stringify(historyData));
  //   userInfoCopy = JSON.parse(JSON.stringify(userInfo));
  //   startWeight = userInfoCopy[0].weight
  //   userGoal = userInfoCopy[0].goal
  //   if (historyData.length === 0) {
  //     mostRecentWeight = userInfoCopy[0].weight
  //   } else {
  //     mostRecentWeight = historyCopy[historyCopy.length-1].weight
  //   }
  // }
  


  return (
    <div>
      <div id="goal-container">
        <div className='goal'>
          <h2>Your Goal:  {userGoal}  </h2>
          <button className="new-goal-button" onClick={toggleGoalModal}>New Goal</button>
        </div>
          {goalModal && (
            <div className='modal'>
              <div className='overlay'></div>
              <div className='modal-content'>
                {/* <div className='each-input'> */}
                <p>Set Your New Goal</p>
                <input name="weight" type="text" placeholder="lb" onChange={onChange}></input>
                <div className='goal-modal-footer'>    
                  <button className='update-button' onClick={updateGoal}>Update</button>
                  <button className='close-button' onClick={toggleGoalModal}>Cancel</button>
                </div>
              </div>
            </div>
          )
          }
        {/* </h2> */}
        {/* <h3>You started from {startWeight} lb</h3> */}
        {progressAndPlan}
        </div>
    </div>
  )
}


