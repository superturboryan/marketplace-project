(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{25:function(e,t,a){},29:function(e,t,a){e.exports=a(58)},34:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){},47:function(e,t,a){},48:function(e,t,a){},49:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){},54:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(17),r=a.n(n),c=(a(34),a(0)),l=a.n(c),i=a(5),s=a(6),o=a(14),m=a(13),u=a(19),d=Object(u.b)(function(e,t){switch(t.type){case"logged-in":return Object(m.a)({},e,{loggedIn:t.toggle,username:t.username});case"show-message":return Object(m.a)({},e,{message:t.message});case"change-number-input-value":var a=Object(m.a)({},e.inputObj);return a[t.name]=t.value,Object(m.a)({},e,{numberInput:Object(m.a)({},a)});case"add-to-cart":return Object(m.a)({},e,{cart:e.cart.concat({item:t.item,quantity:t.quantity})});case"clear-cart":return Object(m.a)({},e,{cart:[]});case"add-to-cart-total":return console.log(typeof t.subTotal),Object(m.a)({},e,{cartTotal:e.cartTotal+t.subTotal});case"reset-cart-total":return Object(m.a)({},e,{cartTotal:0});default:return e}},{loggedIn:!1,username:"",message:"Welcome!",numberInput:{},cart:[],cartTotal:0},window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),p=a(1),g=a(3),h=a(2),f=a(4),v=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(g.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).render=function(){return console.log("Prop contents: "),console.log(a.props),l.a.createElement("div",{className:"galleryItem"},l.a.createElement(s.b,{className:"link1",to:"/item/"+a.props.itemId}," ",l.a.createElement("div",{className:"galleryItemDescription"},a.props.description)," ",l.a.createElement("figure",{className:"galleryImageContainer"},l.a.createElement("img",{className:"gallery__img",alt:"",height:"100px",src:a.props.imageLocation}))," ",l.a.createElement("div",{className:"galleryItemCost"},"$",parseFloat(a.props.cost).toLocaleString({style:"currency"}))),l.a.createElement(s.b,{className:"link2",to:"/profile/"+a.props.sellerId}," ","Link to seller"," "))},a}return Object(f.a)(t,e),t}(c.Component),b=Object(i.b)()(v),E=(a(25),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).fetchItems=function(){fetch("/get-items?search="+a.getQuery(),{credentials:"include"}).then(function(e){return e.text()}).then(function(e){var t=JSON.parse(e);console.log(t),void 0!==t?a.setState({items:t,reloadToggle:!a.state.reloadToggle}):a.setState({items:[],reloadToggle:!a.state.reloadToggle})})},a.componentDidMount=function(){console.log("Component did mount. Query: ",a.getQuery()),a.fetchItems()},a.componentDidUpdate=function(e,t){t.reloadToggle===a.state.reloadToggle&&(console.log("reloadToggle did update."),a.fetchItems())},a.getQuery=function(){var e=a.props.location.pathname;return e.substring(e.lastIndexOf("/")+1)},a.render=function(){return l.a.createElement("div",{className:"galleryContainer"},l.a.createElement("div",{className:"gallery"},a.state.items.map(function(e){return l.a.createElement(b,{cost:e.price,sellerId:e.userId,imageLocation:e.images[0],description:e.title,itemId:e.itemId,key:e.itemId})})))},a.state={items:[],reloadToggle:!1},a}return Object(f.a)(t,e),t}(c.Component)),y=Object(i.b)()(E),O=Object(o.f)(y),N=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(g.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).render=function(){return l.a.createElement("div",null,l.a.createElement(O,null))},a}return Object(f.a)(t,e),t}(c.Component),j=Object(i.b)()(N),I=a(28),S=(a(44),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).componentDidMount=function(){a.updateStoreValue(1)},a.componentWillUnmount=function(){a.props.dispatch({type:"remove-number-input",name:a.props.name})},a.updateStoreValue=function(e){e<0&&(e=0),a.props.dispatch({type:"change-number-input-value",name:a.props.name,value:e})},a.handlerIncValue=function(){var e=parseInt(a.props.allValues[a.props.name])+1;a.updateStoreValue(e)},a.handlerDecValue=function(){var e=a.props.allValues[a.props.name]-1;a.updateStoreValue(e)},a.handlerValueOnChange=function(e){var t=e.target.value;a.updateStoreValue(t)},a.handlerFocusValueInput=function(e){e.target.select()},a.render=function(){return l.a.createElement("span",null,l.a.createElement("button",{onClick:a.handlerDecValue},"-"),l.a.createElement("input",{id:"ValueNumberInput",type:"number",onChange:a.handlerValueOnChange,value:a.props.allValues[a.props.name],onFocus:a.handlerFocusValueInput}),l.a.createElement("button",{onClick:a.handlerIncValue},"+"))},a.state={},a}return Object(f.a)(t,e),t}(c.Component)),w=Object(i.b)(function(e){return{allValues:e.numberInput}})(S),C=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).handlerButtonAddToCart=function(){if(a.props.loggedIn){var e=a.props.numberInputValues[a.props.item.itemId],t=new FormData;t.append("itemId",a.props.item.itemId),t.append("quantity",e),fetch("/set-cart",{method:"POST",body:t,credentials:"include"}).then(function(e){return e.text()}).then(function(e){var t=JSON.parse(e);!0===t.success&&(a.props.dispatch({type:"add-to-cart",itemId:a.props.item,quantity:a.props.numberInputValues[a.props.item.itemId]}),a.props.dispatch({type:"show-message",message:"Added to cart."})),!1===t.success&&alert("not enough in stock")})}else console.log("user needs to be logged in")},a.render=function(){return l.a.createElement("div",null,l.a.createElement(w,{name:a.props.item.itemId}),l.a.createElement("button",{onClick:a.handlerButtonAddToCart},"Add to Cart"))},a.state={quantity:1},a}return Object(f.a)(t,e),t}(c.Component),x=Object(i.b)(function(e){return{cart:e.cart,numberInputValues:e.numberInput,loggedIn:e.loggedIn}})(C),T=(a(45),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault();var t=new FormData;t.append("itemId",a.props.itemId),t.append("title",a.state.title),t.append("rating",a.state.rating),t.append("content",a.state.content),fetch("/add-review",{method:"POST",credentials:"include",body:t}).then(function(e){return e.text()}).then(function(e){var t=JSON.parse(e);t.success?(console.log(t),a.props.dispatch({type:"show-message",message:"Your rating has been posted!"}),a.setState({posted:!0})):console.log(t)})},a.handleTitle=function(e){a.setState({title:e.target.value})},a.handleRating=function(e){var t=parseInt(e.target.value);isNaN(t)?a.setState({rating:5}):a.setState({rating:t})},a.handleContent=function(e){a.setState({content:e.target.value})},a.postedReview=function(){return l.a.createElement("div",{className:"your-review"},l.a.createElement("div",{className:"review-flex"},l.a.createElement("div",{className:"review-title"},'"',a.state.title,'"'),l.a.createElement("div",{className:"review-rating review-rating-spacer"},a.state.rating," ",l.a.createElement("span",{className:"review-star"},"\u2b50"))),l.a.createElement("div",{className:"review-content"},a.state.content))},a.render=function(){return a.props.loggedIn?a.state.posted?a.postedReview():l.a.createElement("div",{className:"your-review"},l.a.createElement("h3",{className:"write-a-review"},"Write a review"),l.a.createElement("form",{id:"review-form",onSubmit:a.handleSubmit,encType:"multipart/form-data"},l.a.createElement("div",{className:"review-label"},"Title"),l.a.createElement("div",{className:"review-flex review-space-between review-top-inputs"},l.a.createElement("div",{className:"review-flex"},l.a.createElement("input",{type:"text",onChange:a.handleTitle,value:a.state.title,required:!0,maxLength:140,minLength:4})),l.a.createElement("div",{className:"review-label review-flex review-star-container"},l.a.createElement("select",{className:"review-rating",value:a.state.rating,onChange:a.handleRating},l.a.createElement("option",{value:"1"},"1"),l.a.createElement("option",{value:"2"},"2"),l.a.createElement("option",{value:"3"},"3"),l.a.createElement("option",{value:"4"},"4"),l.a.createElement("option",{value:"5"},"5")),l.a.createElement("span",{className:"review-star"},"\u2b50"))),l.a.createElement("div",{className:"review-label"},"Content"),l.a.createElement("textarea",{form:"review-form",className:"review-content-input",placeholder:"Write a comment...",onChange:a.handleContent,value:a.state.content,required:!0,minLength:10}),l.a.createElement("div",null,l.a.createElement("input",{type:"submit",value:"Submit"})))):null},a.state={title:"",rating:5,content:"",posted:!1},a}return Object(f.a)(t,e),t}(c.Component)),k=Object(i.b)(function(e){return{loggedIn:e.loggedIn}})(T),L=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(g.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).getStars=function(){for(var e=[],t=0;t<a.props.data.rating;t++)e.push(t);return l.a.createElement("div",{className:"review-rating review-rating-spacer"},e.map(function(e){return l.a.createElement("span",{className:"review-star"},"\u2b50")}))},a.getCorrectLink=function(){console.log(a.props.location.pathname);var e=a.props.location.pathname;return"item"===(e=e.substring(1,e.lastIndexOf("/")))?l.a.createElement(s.b,{to:"/profile/"+a.props.data.userId},"\u2014 ",a.props.data.username):"profile"===e?l.a.createElement(s.b,{to:"/item/"+a.props.data.itemId},l.a.createElement("span",null,"Review for "),a.props.data.item[0].title):null},a.render=function(){return console.log("props data: ",a.props),l.a.createElement("div",{className:"your-review-mini"},l.a.createElement("div",{className:"review-flex"},l.a.createElement("div",{className:"review-title"},'"',a.props.data.title,'"'),a.getStars()),l.a.createElement("div",{className:"review-content-mini"},a.props.data.content),l.a.createElement("div",{className:"review-seller-link"},a.getCorrectLink()))},a}return Object(f.a)(t,e),t}(c.Component),D=Object(i.b)()(L),P=Object(o.f)(D),F=function(e){return l.a.createElement(P,{data:e})},R=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).isForUserId=function(){return void 0!==a.props.userId},a.isForItemId=function(){return void 0!==a.props.itemId},a.componentDidMount=function(){var e="noName",t="noValue";a.isForUserId()&&(e="userId",t=a.props.userId),a.isForItemId()&&(e="itemId",t=a.props.itemId),console.log(e+"  "+t),fetch("/get-reviews-for-id?"+e+"="+t).then(function(e){return e.text()}).then(function(e){var t=JSON.parse(e);!1!==t.success?(console.log("Reviews: ",t),a.setState({allReviews:t})):console.log("There are no reviews yet. ",t)})},a.render=function(){return 0===a.state.allReviews.length?(console.log("Reviews count. ",a.state.allReviews.length),l.a.createElement("h3",{className:"review-list-header"},"There are no reviews",a.isForItemId()?" for this item ":" by this user ","yet")):l.a.createElement("div",null,l.a.createElement("h3",{className:"review-list-header"},"Reviews"),l.a.createElement("div",null,a.state.allReviews.map(F)))},a.state={allReviews:[]},a}return Object(f.a)(t,e),t}(c.Component),V=Object(i.b)()(R),q=(a(46),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).handleClick=function(e){a.setState({expandedImage:a.props.images[e],style:{height:"35%",display:"block"}}),console.log("Image clicked. State set for selected image")},a.resetState=function(){a.setState({expandedImage:""}),console.log("X clicked. State reset for expandedImage")},a.bigDisplay=function(){if(""!==a.state.expandedImage)return l.a.createElement("div",{className:"expandedImgContainer"},l.a.createElement("span",{onClick:a.resetState,className:"closebtn"},"\xd7"),l.a.createElement("img",{alt:"Expanded",id:"expandedImg",style:a.state.style,src:a.state.expandedImage}))},a.renderImage=function(e){return l.a.createElement("div",{key:e},l.a.createElement("img",{className:"imgColumn",alt:a.props.title+"_image",height:"150px",src:a.props.images[e],onClick:function(){return a.handleClick(e)}}))},a.render=function(){return l.a.createElement("div",{className:"tabbed-gallery-container"},l.a.createElement("div",{className:"imgRow",id:"scrollmenu"},a.props.images.map(function(e,t){return a.renderImage(t)})),a.bigDisplay())},a.state={expandedImage:"",style:{height:"35%",display:"block"}},console.log("Initial Tabbed Gallery state: "),console.log(a.state),a}return Object(f.a)(t,e),t}(c.Component)),A=Object(i.b)()(q),_=(a(47),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).componentDidMount=function(){fetch("/get-single-item?itemId="+a.getItemId()).then(function(e){return e.text()}).then(function(e){var t=JSON.parse(e);!1!==t.success?(console.log("Received item details: ",t),a.setState({item:t})):console.log("Item does not exist.",t)})},a.getItemId=function(){var e=a.props.location.pathname;return e.substring(e.lastIndexOf("/")+1)},a.getCityStr=function(){var e=a.state.item;return e.city+", "+e.province+", "+e.country},a.state={item:void 0},console.log("Initial state: "),console.log(a.state),a}return Object(f.a)(t,e),Object(I.a)(t,[{key:"render",value:function(){return console.log("ItemDetailsCompenent props: ",this.props.match.params.id),void 0===this.state.item?null:l.a.createElement("div",{className:"item-details-container"},l.a.createElement("div",{className:"item-details-details-container"},l.a.createElement("h1",null,this.state.item.title),l.a.createElement(s.b,{className:"item-details-link-to-seller",to:"/profile/"+this.state.item.userId},"Link to seller"),l.a.createElement("p",{className:"item-details-description"},this.state.item.details),l.a.createElement("fieldset",null,l.a.createElement("dl",null,l.a.createElement("dt",null,"Price"),l.a.createElement("dd",null,"$",parseFloat(this.state.item.price).toLocaleString({style:"currency"}))),l.a.createElement("dl",null,l.a.createElement("dt",null,"In Stock"),l.a.createElement("dd",null,this.state.item.stock," available")),l.a.createElement("dl",null,l.a.createElement("dt",null,"Ships from"),l.a.createElement("dd",null,this.getCityStr()))),l.a.createElement(x,{item:this.state.item})),l.a.createElement(A,{images:this.state.item.images,itemId:this.state.item.id,title:this.state.item.title}),l.a.createElement("div",{className:"item-details-review-container"},l.a.createElement(k,{itemId:this.state.item.itemId})),l.a.createElement("div",{className:"item-details-reviews"},l.a.createElement(V,{itemId:this.state.item.itemId})))}}]),t}(c.Component)),M=Object(i.b)()(_),U=Object(o.f)(M),J=(a(48),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).componentWillReceiveProps=function(){a.setState({redirect:!0})},a.handleSubmit=function(e){e.preventDefault();var t=new FormData;t.append("username",a.state.username),t.append("password",a.state.password),console.log(t),fetch("/signup",{method:"POST",credentials:"include",body:t}).then(function(e){return e.text()}).then(function(e){var t=JSON.parse(e);if(!t.success)return console.log(t),void a.props.dispatch({type:"show-message",message:"Username not available, or an error occurred. Please try again"});console.log(t),a.props.dispatch({type:"show-message",message:"Signup successful!"}),a.props.dispatch({type:"logged-in",toggle:!0,username:t.username})})},a.handleUsername=function(e){a.setState({username:e.target.value})},a.handlePassword=function(e){a.setState({password:e.target.value})},a.render=function(){return a.props.loggedIn||a.state.redirect?l.a.createElement(o.a,{to:"/"}):l.a.createElement("div",{className:"standard-container",id:"signup-main-div"},l.a.createElement("h1",{id:"signupPageTitle"},"Signup"),l.a.createElement("form",{onSubmit:a.handleSubmit,encType:"multipart/form-data"},l.a.createElement("h4",{className:"signupHeaderText"},"Username"),l.a.createElement("input",{id:"usernameInputSignup",type:"text",onChange:a.handleUsername,value:a.state.username,name:"username"}),l.a.createElement("h4",{className:"signupHeaderText"},"Password"),l.a.createElement("input",{id:"passwordInputSignup",type:"text",onChange:a.handlePassword,value:a.state.password,name:"password"}),l.a.createElement("div",null,l.a.createElement("input",{id:"submitSignup",type:"submit",value:"Sign up"}))))},a.state={username:"",password:"",redirect:!1},a}return Object(f.a)(t,e),t}(c.Component)),B=Object(i.b)(function(e){return{loggedIn:e.loggedIn}})(J),H=(a(49),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).componentWillReceiveProps=function(){a.setState({redirect:!0})},a.handleSubmit=function(e){e.preventDefault();var t=new FormData;t.append("username",a.state.username),t.append("password",a.state.password),console.log(t),fetch("/login",{method:"POST",credentials:"include",body:t}).then(function(e){return e.text()}).then(function(e){var t=JSON.parse(e);if(!t.success)return console.log(t),void a.props.dispatch({type:"show-message",message:"Login not successful. Please try again"});console.log(t),a.props.dispatch({type:"show-message",message:"Login successful!"}),a.props.dispatch({type:"logged-in",toggle:!0,username:t.username})})},a.handleUsername=function(e){a.setState({username:e.target.value})},a.handlePassword=function(e){a.setState({password:e.target.value})},a.render=function(){return a.props.loggedIn||a.state.redirect?l.a.createElement(o.a,{to:"/"}):l.a.createElement("div",{className:"standard-container",id:"login-page-container"},l.a.createElement("h1",{id:"loginPageTitle"},"Login"),l.a.createElement("form",{onSubmit:a.handleSubmit,encType:"multipart/form-data"},l.a.createElement("h4",{className:"loginHeaderText"},"Username"),l.a.createElement("input",{id:"usernameInputLogin",type:"text",onChange:a.handleUsername,value:a.state.username}),l.a.createElement("h4",{className:"loginHeaderText"},"Password"),l.a.createElement("input",{id:"passwordInputLogin",type:"text",onChange:a.handlePassword,value:a.state.password}),l.a.createElement("div",null,l.a.createElement("input",{id:"submitLogin",type:"submit",value:"Login"}))))},a.state={username:"",password:"",redirect:!1},a}return Object(f.a)(t,e),t}(c.Component)),W=Object(i.b)(function(e){return{loggedIn:e.loggedIn}})(H),Y=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(g.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).render=function(){return l.a.createElement("div",null,l.a.createElement("h1",null,"Oops! ",a.props.message),"Click ",l.a.createElement(s.b,{to:"/"},"here")," to go back.")},a}return Object(f.a)(t,e),t}(c.Component),$=(a(50),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault();var t=new FormData;t.append("title",a.state.title),t.append("description",a.state.description),t.append("price",a.state.price),t.append("stock",a.state.stock),t.append("city",a.state.city),t.append("province",a.state.province),t.append("country",a.state.country);for(var n=0;n<a.state.images.length;n++)t.append("images",a.state.images[n]);console.log("First image: ",a.state.images[0]),console.log(t),fetch("/add-item",{method:"POST",credentials:"include",body:t}).then(function(e){return e.text()}).then(function(e){var t=JSON.parse(e);if(!t.success)return console.log(t),void a.props.dispatch({type:"show-message",message:"An error occurred."});console.log(t),a.props.dispatch({type:"show-message",message:"Your item has been added!"}),a.setState({redirect:!0})})},a.handleTitle=function(e){a.setState({title:e.target.value})},a.handleDescription=function(e){a.setState({description:e.target.value})},a.handlePrice=function(e){var t=parseFloat(e.target.value);isNaN(t)?a.setState({price:""}):a.setState({price:t})},a.handleStock=function(e){var t=parseInt(e.target.value);isNaN(t)||0===t?a.setState({stock:1}):a.setState({stock:t})},a.handleCity=function(e){a.setState({city:e.target.value})},a.handleProvince=function(e){a.setState({province:e.target.value})},a.handleCountry=function(e){a.setState({country:e.target.value})},a.handleFiles=function(e){a.setState({images:e.target.files}),console.log("Files to upload:",e.target.files)},a.render=function(){return a.props.loggedIn?a.state.redirect?l.a.createElement(o.a,{to:"/"}):l.a.createElement("div",{id:"item-details-page-div"},l.a.createElement("div",{className:"standard-container",id:"div-container-add-item"},l.a.createElement("h1",null,"Sell Something!"),l.a.createElement("form",{onSubmit:a.handleSubmit,encType:"multipart/form-data"},l.a.createElement("div",null,"Title"),l.a.createElement("input",{className:"add-item-form-input",type:"text",onChange:a.handleTitle,value:a.state.title,required:!0}),l.a.createElement("div",null,"Description"),l.a.createElement("textarea",{id:"add-item-form-description",className:"add-item-form-input",type:"text",onChange:a.handleDescription,value:a.state.description,required:!0}),l.a.createElement("div",null,"Price"),l.a.createElement("input",{className:"add-item-form-input",type:"number",onChange:a.handlePrice,value:a.state.price,min:0,step:.01,required:!0}),l.a.createElement("div",null,"Quantity"),l.a.createElement("input",{className:"add-item-form-input",type:"number",onChange:a.handleStock,value:a.state.stock,min:1,required:!0}),l.a.createElement("div",{id:"add-item-location-div"},l.a.createElement("div",null,l.a.createElement("p",{className:"add-item-field-heading"},"City"),l.a.createElement("input",{className:"add-item-form-input",type:"text",onChange:a.handleCity,value:a.state.city,required:!0})),l.a.createElement("div",null,l.a.createElement("p",{className:"add-item-field-heading"},"Province/State"),l.a.createElement("input",{className:"add-item-form-input",type:"text",onChange:a.handleProvince,value:a.state.province,required:!0})),l.a.createElement("div",null,l.a.createElement("p",{className:"add-item-field-heading"},"Country"),l.a.createElement("input",{className:"add-item-form-input",type:"text",onChange:a.handleCountry,value:a.state.country,required:!0}))),l.a.createElement("div",{id:"add-item-form-file-input"},l.a.createElement("input",{type:"file",accept:"image/*",onChange:a.handleFiles,id:"images",name:"images",multiple:!0,required:!0})),l.a.createElement("div",null,l.a.createElement("input",{id:"submitAddItem",type:"submit",value:"Submit"}))))):l.a.createElement(Y,{message:"You're not signed in!"})},a.state={title:"",description:"",price:0,stock:1,city:"",province:"",country:"",images:void 0,redirect:!1},a}return Object(f.a)(t,e),t}(c.Component)),Q=Object(i.b)(function(e){return{loggedIn:e.loggedIn}})($),X=(a(51),function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(g.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).startTimeout=function(e){""!==a.props.message&&(console.log("start timeout!"),setTimeout(function(){a.props.dispatch({type:"show-message",message:""}),console.log("timed out!")},e))},a.render=function(){return""===a.props.message?null:(console.log("Animated message: "+a.props.message),a.startTimeout(2e3),l.a.createElement("div",{className:"animated-message"},a.props.message))},a}return Object(f.a)(t,e),t}(c.Component)),G=Object(i.b)(function(e){return{message:e.message}})(X),z=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(g.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).handleClick=function(){fetch("/logout",{method:"GET",credentials:"include"}).then(function(e){return e.text()}).then(function(e){var t=JSON.parse(e);t.success?(console.log(t),a.props.dispatch({type:"logged-in",toggle:!1,username:""})):console.log(t)})},a.render=function(){return l.a.createElement("button",{id:"logout-button",className:"logoutButton",onClick:a.handleClick},"Logout")},a}return Object(f.a)(t,e),t}(c.Component),K=Object(i.b)()(z),Z=(a(52),function(e){function t(){var e;return Object(p.a)(this,t),(e=Object(g.a)(this,Object(h.a)(t).call(this))).onSubmit=function(t){t.preventDefault(),e.setState({redirect:!0})},e.onChangedText=function(t){e.setState({input:t.target.value})},e.formattedInput=function(){return encodeURIComponent(e.state.input.replace(/%/gi,""))},e.render=function(){return e.state.redirect?(e.setState({redirect:!1}),l.a.createElement(o.a,{to:"/search/"+e.formattedInput()})):l.a.createElement("div",{id:"search-bar-div",className:"toTheEnd"},l.a.createElement("form",{onSubmit:e.onSubmit},l.a.createElement("input",{className:"searchBar",type:"text",onChange:e.onChangedText,value:e.state.input}),l.a.createElement("input",{id:"search-bar-submit",type:"submit",value:"Search"})))},e.state={input:"",redirect:!1},e}return Object(f.a)(t,e),t}(c.Component)),ee=(a(53),function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(g.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).ifLoggedInDoThis=function(e){if(a.props.loggedIn)return e},a.getSignupLogin=function(){if(!a.props.loggedIn)return l.a.createElement("div",{className:"toTheEnd navigation-unflex",id:"signup-login"},l.a.createElement("div",{className:"toTheEnd"},l.a.createElement("span",{className:"top-top-bar"},l.a.createElement(s.b,{to:"/signup"},"Signup")),l.a.createElement("span",{className:"top-top-bar"}," | ",l.a.createElement(s.b,{to:"/login"},"Login"))))},a.getUserRelatedLinks=function(){return l.a.createElement("div",{className:"toTheEnd navigation-unflex"},l.a.createElement("div",{className:"toTheEnd"},l.a.createElement("span",{className:"top-top-bar"},a.props.username+" | "),l.a.createElement(s.b,{className:"top-top-bar",to:"/add-item"},"Sell Something!"),l.a.createElement("span",{className:"top-top-bar"}," | "),l.a.createElement(s.b,{className:"top-top-bar",to:"/cart"},l.a.createElement("img",{id:"cart-img",height:"12px",src:"/assets/cart.png"})),l.a.createElement(K,{className:"toTheEnd"})))},a.getNavigationLinks=function(){return l.a.createElement("div",{className:"navigation-flex link-area just-bottom"},"Categories:",l.a.createElement("div",null,"Clothing and Accessories"),l.a.createElement("div",null,"Films and Music"),l.a.createElement("div",null,"Home and Appliances"),l.a.createElement("div",null,"Electronics"),l.a.createElement("div",null,"Video Games"))},a.render=function(){return l.a.createElement("div",null,l.a.createElement("div",{className:"above-navigation-bar"},a.getSignupLogin(),a.ifLoggedInDoThis(a.getUserRelatedLinks())),l.a.createElement("div",{className:"navigation-bar"},l.a.createElement("div",{className:"navigation-flex"},l.a.createElement("div",{className:"toTheEnd"},l.a.createElement("div",null),l.a.createElement("div",null))),l.a.createElement("div",{className:"navigation-flex"},l.a.createElement("div",{id:"ali-bae-div",className:"ali-bae-heading"},l.a.createElement(s.b,{to:"/"},"RockyBay")),l.a.createElement("div",{className:"toTheEnd"},l.a.createElement("div",{id:"search-bar-div"},l.a.createElement(Z,null)))),l.a.createElement("div",null)))},a}return Object(f.a)(t,e),t}(c.Component)),te=Object(i.b)(function(e){return{loggedIn:e.loggedIn,username:e.username}})(ee),ae=(a(54),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).componentDidMount=function(){fetch("/get-items-by-user?userId="+a.props.match.params.userId).then(function(e){return e.text()}).then(function(e){var t=JSON.parse(e);console.log(t),a.setState({items:t})})},a.itemDetailsHtml=function(e){return l.a.createElement("div",{className:"galleryItem"},l.a.createElement(s.b,{className:"link1",to:"/item/"+e.itemId},l.a.createElement("div",{className:"galleryItemDescription"},e.title),l.a.createElement("figure",{className:"galleryImageContainer"},l.a.createElement("img",{className:"gallery__img",alt:"",height:"100px",src:e.images[0]})),l.a.createElement("div",{className:"galleryItemCost"},"$",parseFloat(e.price).toLocaleString({style:"currency"}))))},a.itemHtml=function(){return 0===a.state.items.length?l.a.createElement("h3",{className:"profile-username"},"There are no items on sale by this user."):l.a.createElement("div",{className:"profile-top-half"},l.a.createElement("div",{className:"profile-user-details"},l.a.createElement("img",{className:"avatar",src:"/assets/default-user.png"}),l.a.createElement("h2",{className:"profile-username"},a.state.items[0].user[0].username,"'s profile")),l.a.createElement("h3",{className:"profile-items-header"},"Items for sale"),l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"gallery"},a.state.items.map(function(e){return a.itemDetailsHtml(e)}))))},a.render=function(){return l.a.createElement("div",{className:"profile-body"},a.itemHtml(),l.a.createElement("hr",null),l.a.createElement(V,{userId:a.props.match.params.userId}))},a.state={items:[]},a}return Object(f.a)(t,e),t}(c.Component)),ne=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(g.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).componentDidMount=function(){var e=a.props.item.price*a.props.quantity;a.props.dispatch({type:"add-to-cart-total",subTotal:e})},a.render=function(){console.log(a.props);var e=parseInt(a.props.item.price);e="$"+e.toLocaleString({style:"currency"});var t="$"+(a.props.item.price*a.props.quantity).toLocaleString({style:"currency"});return l.a.createElement("div",{className:"itemListElem-container"},l.a.createElement("img",{alt:"",src:a.props.item.images[0]}),l.a.createElement("div",null,l.a.createElement("div",{className:"itemListElem-title"},a.props.item.title),l.a.createElement("hr",null),l.a.createElement("fieldset",null,l.a.createElement("dl",null,l.a.createElement("dt",null,"Quantity"),l.a.createElement("dd",null,a.props.item.quantity)),l.a.createElement("dl",null,l.a.createElement("dt",null,"Price"),l.a.createElement("dd",null,e)),l.a.createElement("dl",null,l.a.createElement("dt",null,"Subtotal"),l.a.createElement("dd",null,t)))))},a}return Object(f.a)(t,e),t}(c.Component),re=Object(i.b)()(ne),ce=(a(55),function(e){return l.a.createElement(re,{item:e,quantity:e.quantity})}),le=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(g.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).componentWillMount=function(){a.props.dispatch({type:"reset-cart-total"})},a.render=function(){return console.log("itemlist item"),console.log(a.props.allItems),l.a.createElement("div",{className:"itemList-container"},l.a.createElement("div",{className:"itemList-items-container"},a.props.allItems.map(ce)),l.a.createElement("hr",null),l.a.createElement("div",{className:"itemList-total-info"},l.a.createElement("div",{className:"itemList-total-text"},"Total:"),l.a.createElement("div",{className:"itemList-total-text-data"},"$",parseFloat(a.props.total).toLocaleString({style:"currency"}))))},a}return Object(f.a)(t,e),t}(c.Component),ie=Object(i.b)(function(e){return{total:e.cartTotal}})(le),se=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(g.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).render=function(){return l.a.createElement(s.b,{style:{color:"white"},to:"/Checkout"},"CheckOut!")},a}return Object(f.a)(t,e),t}(c.Component),oe=Object(i.b)()(se),me=(a(56),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).clearCart=function(){fetch("/clear-cart",{credentials:"include"}).then(a.props.dispatch({type:"clear-cart"})),a.setState({items:[]})},a.componentWillMount=function(){fetch("/get-cart",{credentials:"include"}).then(function(e){return e.text()}).then(function(e){var t=JSON.parse(e);console.log("cartFromServer"),console.log(t),a.setState({items:t}),a.props.dispatch({type:"clear-cart"}),t.forEach(function(e){a.props.dispatch({type:"add-to-cart",item:e,quantity:e.quantity})})})},a.handlerOnClick=function(){},a.render=function(){return l.a.createElement("div",{className:"cart-container"},l.a.createElement(ie,{allItems:a.state.items}),l.a.createElement("div",{className:"cart-buttons"},l.a.createElement("button",{onClick:a.clearCart},"Clear cart!"),l.a.createElement("button",null," ",l.a.createElement(oe,null)," ")))},a.state={items:[]},a}return Object(f.a)(t,e),t}(c.Component)),ue=Object(i.b)(function(e){return{cartItems:e.cart}})(me),de=(a(57),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).handlerCardNumber=function(e){a.setState({cardNumber:e.target.value})},a.handlerName=function(e){a.setState({name:e.target.value})},a.handlerCv=function(e){a.setState({cv:e.target.value})},a.handlerExpirationMonth=function(e){a.setState({expirMonth:e.target.value})},a.handlerExpirationYear=function(e){a.setState({expirYear:e.target.value})},a.render=function(){return l.a.createElement("form",{onSubmit:a.handlerSubmit},l.a.createElement("div",null,"Credit card number"),l.a.createElement("input",{className:"PayFormInput",id:"cardnumber",type:"text",onChange:a.handlerCardNumber,value:a.state.cardNumber})," ","cvv",l.a.createElement("input",{className:"PayFormInput",id:"cvv",type:"text",onChange:a.handlerCv,value:a.state.cv}),l.a.createElement("div",null,"Full name"),l.a.createElement("input",{className:"PayFormInput",id:"name",type:"text",onChange:a.handlerName,value:a.state.name}),l.a.createElement("div",null,"Expiration"),"month/year",l.a.createElement("div",null,l.a.createElement("input",{className:"PayFormInput",id:"month",type:"text",onChange:a.handlerExpirationMonth,value:a.state.expirMonth}),"/",l.a.createElement("input",{className:"PayFormInput",id:"year",type:"text",onChange:a.handlerExpirationYear,value:a.state.expirYear})))},a.state={cardNumber:"",name:"",cv:"",expriMonth:"",expirYear:""},a}return Object(f.a)(t,e),t}(c.Component)),pe=Object(i.b)()(de),ge=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).componentDidMount=function(){a.setState({cart:a.props.cart})},a.handlerStepOneButton=function(){console.log(a.state.step),0===a.state.step&&a.setState({step:a.state.step+1})},a.handlerStepTwoButton=function(){console.log(a.state.step),1===a.state.step&&fetch("/clear-cart",{credentials:"include"}).then(function(e){return e.text()}).then(function(e){a.props.dispatch({type:"clear-cart"})}),a.setState({step:a.state.step+1})},a.renderSwitch=function(){if(a.state.cart.length<1)return l.a.createElement(Y,{message:"An error occurred."});if(0===a.state.step){console.log("in checkout");var e=a.state.cart.map(function(e){return e.item});return l.a.createElement("div",{className:"cart-container"},l.a.createElement(ie,{allItems:e}),l.a.createElement("div",{className:"cart-buttons"},l.a.createElement("button",{onClick:a.handlerStepOneButton},"Confirm")))}if(1===a.state.step)return l.a.createElement("div",{className:"checkout-payment-container"},l.a.createElement("h4",{className:"checkout-instructions"},"Enter payment info"),l.a.createElement("p",{className:"checkout-total-text",id:"paytotal"},"Total:"," ",l.a.createElement("span",{className:"checkout-total",id:"paytotal"},"$",parseFloat(a.props.total).toLocaleString({style:"currency"}))),l.a.createElement("div",null,l.a.createElement(pe,null)),l.a.createElement("div",{className:"cart-buttons"},l.a.createElement("button",{onClick:a.handlerStepTwoButton},"Pay")));if(2===a.state.step){var t=a.state.cart.map(function(e){return e.item});return l.a.createElement("div",{className:"cart-container"},l.a.createElement("h4",{className:"checkout-receipt-text"},"Receipt"),l.a.createElement(ie,{allItems:t}),l.a.createElement("div",{className:"checkout-return"},l.a.createElement(s.b,{to:"/"},"Return to homepage")))}return l.a.createElement(Y,{message:"An error occurred. Are you logged in?"})},a.render=function(){return a.renderSwitch()},a.state={step:0,cart:[]},a}return Object(f.a)(t,e),t}(c.Component),he=Object(i.b)(function(e){return{loggedIn:e.loggedIn,cart:e.cart,total:e.cartTotal}})(ge),fe=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(g.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).componentDidMount=function(){fetch("/verify-cookie",{credentials:"include"}).then(function(e){return e.text()}).then(function(e){var t=JSON.parse(e);"object"!==typeof t&&console.log("autologin fetch needs to return an object"),!0===t.success&&a.props.dispatch({type:"logged-in",toggle:!0,username:t.username})})},a.render=function(){return null},a}return Object(f.a)(t,e),t}(c.Component),ve=Object(i.b)()(fe),be=l.a.createElement(i.a,{store:d},l.a.createElement(s.a,null,l.a.createElement(o.b,{exact:!1,path:"/",component:ve}),l.a.createElement(o.b,{exact:!1,path:"/",component:te}),l.a.createElement(o.b,{exact:!1,path:"/",component:G}),l.a.createElement(o.d,null,l.a.createElement(o.b,{exact:!0,path:"/(|search|)/",component:j}),l.a.createElement(o.b,{exact:!0,path:"/search/:query",component:j}),l.a.createElement(o.b,{exact:!0,path:"/item/:id",component:U}),l.a.createElement(o.b,{exact:!0,path:"/signup",component:B}),l.a.createElement(o.b,{exact:!0,path:"/login",component:W}),l.a.createElement(o.b,{exact:!0,path:"/add-item",component:Q}),l.a.createElement(o.b,{exact:!0,path:"/profile/:userId",component:ae}),l.a.createElement(o.b,{exact:!0,path:"/cart",component:ue}),l.a.createElement(o.b,{exact:!0,path:"/checkout",component:he}),l.a.createElement(o.b,{render:function(e){return l.a.createElement(Y,Object.assign({},e,{message:"This page doesn't exist."}))}}))));r.a.render(be,document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.e118f0b0.chunk.js.map