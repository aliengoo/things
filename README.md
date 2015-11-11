# Things

ReactJS demo project.

## State

The application has only one _State_ object (`AppStore`).

**_State_ is immutable.  On each state change, a new _State_ object is created**.

In the case of this application, each property on the State object represents a _Container Model_. A _Container Model_ encapsulates the state of a given _Container_.

#####Example state
	
	const initialState = {
	  thing: {
	   	/// the container is "thing"
	  },
	
	  things: {
	    /// the container is "things"
	  }
	};


In the example, there is a single State, where `thing` and `things` represent data for their respective _Container_, i.e, they represent a _Container Model_. 


### Container Model

A _Container Model_ represents the given state of a given _Container_.  


## Container


In this application, a _Container_ is a single view, e.g. of a `Thing` object, where _Actions_, e.g. create, retrieve, update or delete actions can be invoked to dispatch _Container Model_ updates, and, in turn, _State_ updates.

The _Container_ should only be given the _Container Model_ that it represents.  The _Container Model_ is accessible via `this.props.<containerModelName>`. See [react-redux](https://github.com/rackt/react-redux) for more information on how _State_ is connected to `this.props`. 

**`this.state` should not be used inside a _Container_.**  Instead, _State_ changes should only be made at via _Actions_, and Actions should only be invoked in the _Container_.

_Actions_ invoked inside a _Container_ can act outside of the _Container Model_, e.g. to notify other users that you are viewing a `Thing`. 
    
## Actions & Reducers

In this application, _Actions_ are implemented as ES6 classes, and _Reducers_ are implemented as static functions of the given _Action_ class.

An _Action_ represent a notification of a given `type` (required by redux), that may or may not have data sent to it during invocation, and may have additional meta properties.

The redux Flux implementation requires a _Reducer_ for each property of _State_.  In the case of this application, each property of _State_ is a _Container Model_, therefore the static _Reducer_ function on each _Action_ receives the previous _Container Model_ state and the _Action_ instance, and determines whether or not it is interested.

If the _Reducer_ is not interested, the original _Container Model_ is returned; otherwise, a new instance of the _Container Model_ is returned with any changes requested in the _Action_ instance applied.

 
	"use strict";
	
	import ModelAction from './ModelAction';
	
	const ActionType = "InitialiseCurrentModelAction";
	
	export default class InitialiseCurrentModelAction extends ModelAction {
	  constructor(modelType) {
	    super(ActionType, modelType);
	  }
	
	  static containerModel(previousContainerModel = {}, action) {
	
	    if (action.type !== ActionType) {
	      return previousContainerModel;
	    }
	
	    let newState = {
	      previousModel: null,
	      currentModel: action.data
	    };
	
	    let x = Object.assign({}, previousContainerModel, newState);
	
	    console.log(x);
	    return x;
	  }
	}
	


	
### Consuming Actions Inside a Container

Each _Action_ is implemented as an ES6 class.  To invoke an _Action_, there must be an instance.  The creation of the instance should happen before the _Container_ component is mounted, e.g. before anything but rendering needs to happen.

	// initialise the action
	var createModelAction = new CreateModelAction("thing");

	// invoke the action with data to create the required action type and pass it to the dispatcher.
	dispatch(createModelAction.invoke(newThing));

### Register the Root Reducer

Redux expects a single _Reducer_, or _Root Reducer_ to act on _State_ when an _Action_ is dispatched.  Redux provides `combineReducers` that can produce a _Root Reducer_ based on functions mapped to properties of the _State.

##### Example (different project)
	
	import todos from './todos-reducer';
	import todoItemText from './todo-item-text-reducer';
	import inProgress from './in-progress-reducer';
	import activeTodoId from './active-todo-id-reducer';
	import err from './err-reducer';
	import todoBeingEditedPriorState from './todo-being-edited-prior-state-reducer';
	import todoBeingEdited from './todo-being-edited-reducer';

	import { combineReducers } from 'redux';
	
	const rootReducer = combineReducers({
	  todoBeingEditedPriorState,
	  todoBeingEdited,
	  todoItemText,
	  inProgress,
	  activeTodoId,
	  err,
	  todos
	});
	
	export default rootReducer;

In this application, we need to run through each registered _Action_ and determine if the _Container Model_ is affected by that each.  As each _Action_ contains a static _Reducer_ function that only applies to a single _State_ property, a different evaluation method is required.

#### _Reducer_ Bundling

A _Reducer_ bundler takes each _Reducer_ function, wraps it in a _Container Model_ _Reducer_ function, and invokes each "sub-reducer", i.e., the static _Reducer_ function on the _Action_.

##### Example Bundler Implementation

	export default class ModelReducerBundler {
	
	  /**
	   * Runs each ModelAction.Container static function in-turn against the container model
	   * @param {Array} modelActions - array of action classes
	   * @returns {Function} - the reducer which rolls over each action.model function, and returns a new state
	   */
	  static bundle(modelActions) {
	    return (previousContainerModel = {}, action) => {
	
	      let memoState = Object.assign({}, previousContainerModel);
	
	      modelActions.forEach((modelAction) => {
	        memoState = modelAction.containerModel(memoState, action);
	      });
	
	      return memoState;
	    };
	  }
	}

##### Example Setting the Root Reducer using Bundling
	
	// ...import ommitted for brevity...

	let model = ModelReducerBundler.bundle([
	  AbortEditingModelAction,
	  BeginEditingModelAction,
	  CreateModelAction,
	  CreateModelBroadcastAction,
	  DeleteModelAction,
	  DeleteModelBroadcastAction,
	  GetModelAction,
	  SetModelPropertyAction,
	  UpdateModelAction,
	  UpdateModelBroadcastAction
	]);
	
	const rootReducer = combineReducers({
	  // The container model the bundle of reducers should act on in turn
	  thing: model
	});
	
	export default rootReducer;


 

## Container Components

A _Container Component_ exists inside a _Container_, e.g. an `input` component.

A _Container Component_ **should not access _State_ directly**.

A _Container Component_ **should not instantiate or invoke an _Action_ directly**.

A _Container_ should provide data and functions via `props` to the _Child Component_.

