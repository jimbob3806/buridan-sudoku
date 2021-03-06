// General imports
import React, {
    useState,
    useReducer
} from "react"

// Own imports
import GlobalContext from "../Global"
import {
    answerReducer,
    ADD_ANSWER,
    REMOVE_ANSWER
 } from "../reducers/answer"
import {
    candidateReducer,
    ADD_CANDIDATE,
    REMOVE_CANDIDATE,
    BURN_ONE,
    BURN_CANDIDATES
 } from "../reducers/candidate"
 import {
    testReducer,
    ADD_TEST,
    REMOVE_TEST
 } from "../reducers/test"

// Component
const GlobalState = props => {
    const [puzzle, setPuzzle] = useState([])
    const [solution, setSolution] = useState([])
    const [answer, dispatchAnswer] = useReducer(
        answerReducer, 
        // Default value
        []
    )
    // Note candidates vs candidate differentation. Each cell may have many 
    // candidates, but each button click or keypress will remove/add 1 candidate 
    // at a time only
    const [candidates, dispatchCandidate] = useReducer(
        candidateReducer,
        // Default value
        []
    )
    const [test, dispatchTest] = useReducer(
        testReducer,
        // Default value
        []
    )

    // Reducers as objects with their relevant functions
    const setAnswer = {
        add: (answer, index) => {
            dispatchAnswer({
                type: ADD_ANSWER,
                answer: answer,
                index: index
            })
        },
        remove: index => {
            dispatchAnswer({
                type: REMOVE_ANSWER,
                index: index
            })
        }
    }

    const setCandidate = {
        add: (candidate, index) => {
            dispatchCandidate({
                type: ADD_CANDIDATE,
                candidate: candidate,
                index: index
            })
        },
        remove: (candidate, index) => {
            dispatchCandidate({
                type: REMOVE_CANDIDATE,
                candidate: candidate,
                index: index
            })
        },
        burnOne: (index) => {
            dispatchCandidate({
                type: BURN_ONE,
                index: index
            })
        },
        burnAll: () => {
            dispatchCandidate({
                type: BURN_CANDIDATES
            })
        }
    }

    const setTest = {
        add: (test, index) => {
            dispatchTest({
                type: ADD_TEST,
                test: test,
                index: index
            })
        },
        remove: index => {
            dispatchTest({
                type: REMOVE_TEST,
                index: index
            })
        }
    }

    return (
        <GlobalContext.Provider value = {{
            // Context values
            puzzle: puzzle,
            solution: solution,
            answer: answer,
            candidates: candidates,
            test: test,
            // Asignment functions
            setPuzzle: setPuzzle,
            setSolution: setSolution,
            setAnswer: setAnswer,
            setCandidate: setCandidate,
            setTest: setTest
        }} >
            {props.children}
        </GlobalContext.Provider>
    )
}

// Exports
export default GlobalState