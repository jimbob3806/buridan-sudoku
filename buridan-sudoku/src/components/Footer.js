//General imports
import React from "react"

//Material-ui imports

//Own imports

//Functional elements -> NONE for render files

//Render elements
const FooterRender = props => {
    /*eslint-disable no-unused-vars*/
    /*Assiging all props to constants, and declaring the DefaultComponent,
    which allows for the rendering of any child/sub component with all props
    passed to it. eslint-disable... used so that no caution messages are thrown,
    and we do not have to keep toggling commented lines. */
    // const functions = props.functions
    // const styles = props.styles()
    // const data = props.data
    // const auth = props.auth

    // const DefaultComponent = ({ component: Component }) => (
    //     <Component
    //         functions = {functions}
    //         styles = {styles}
    //         data = {data}
    //         auth = {auth}
    //     />
    // )
    /*eslint-enable no-unused-vars*/

    return (
        <div>            
            This is the footer
        </div>
    )
}

export default FooterRender