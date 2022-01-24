import React, { Component } from "react";

//every component has three phases and render will execute in all first two phases
//mounting:birth of component ==> constructor,render,componentdidmount
//update:updating the component ==>componentdidupdate,shouldcomponentupdate,render
//unmount:death of component ==>componentwillunmount

export default class Demo extends Component {
  constructor(props) {
    super(props);
    console.log("1st constructor function=>mounting phase");
    this.state = {
      count: 0,
      button:true,
    };
  }
  //and this will execute after the component is mounted successfully
  //used in for getting the data from the apis after showing the skeleton of the component
  componentDidMount() {
    console.log("3rd function component dd mount=>mounting phase");
  }

  //this componentdidupdate will execute whenever the state has been modified/changed/updated
  componentDidUpdate() {
    console.log("4th function component did update=>update phase");
  }


  //wont work on the initial render
  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      "checking if component should update before rendering if true re-renders if false no re-rendering=>update phase"
    );
    console.log("prev=>",this.state.count," next=>",nextState.count)
    // return this.state.count !== nextState.count;
    return true;
  }

  incrementCount = () => {
    this.setState((state, props) => {
      return { ...state,count: state.count + 1 };
    });
  };

  //doing some of the work when the component is dying or being unmounter from the rendering phase
  componentWillUnmount(){
    console.log("component is unmounting")
  }

  //is used for loggin the errors invoked by the descendants components
  componentDidCatch(){
    console.log("in this demo")
  }

  render() {
    return (
      <div>
        <h1>count</h1>
        <h1>{this.state.count}</h1>
        {this.state.button ? <Button incrementCount={this.incrementCount}></Button>:<></>}
        <button
          onClick={() => {
            console.log("setting the counter to 5")
            this.setState((state, props) => {
              return { ...state,count: 5 };
            });
          }}
        >
          set counter to 5
        </button>
        {console.log("2nd function is render=>mounting phase")}
        <button onClick={()=>{
            this.setState((state,props)=>{
                return{
                    ...state,
                    button:false,
                }
            })
        }}>Remove Counter button</button>
      </div>
    );
  }
}

let cleanUp=null;
class Button extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.variable="incrementCount"
    }
    name="qubais";

    componentDidMount(){
       cleanUp=setInterval(() => {
            console.log(Date.now())
        },3000);
    }

    //so why we use that below is that if in the component did mount we have 
    //provided set interval while unmounting the Button componenet
    //the button component is unmounted but the setInterval has not been cleared
    //so we use to clear setINterval reference cleanup function in the 
    //component will mount
    componentWillUnmount(){
        clearInterval(cleanUp)
    }


    render(){
        return <button onClick={this.props.incrementCount}>{this.name},{this.variable}</button>
    }
}