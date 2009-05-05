YUI.add("attribute",function(B){B.State=function(){this.data={};};B.State.prototype={addAll:function(O,T){var S;for(S in T){if(T.hasOwnProperty(S)){this.add(O,S,T[S]);}}},add:function(O,S,U){var T=this.data;T[S]=T[S]||{};T[S][O]=U;},remove:function(S,U){var T=this.data,O=function(V){if(T[V]&&(S in T[V])){delete T[V][S];}};if(B.Lang.isString(U)){O(U);}else{B.each(U||T,function(W,V){if(B.Lang.isString(V)){O(V);}else{O(W);}},this);}},get:function(O,S){var T=this.data;return(T[S]&&O in T[S])?T[S][O]:undefined;},getAll:function(O){var T=this.data,S;B.each(T,function(V,U){if(O in T[U]){S=S||{};S[U]=V[O];}},this);return S;}};var I=B.Object,J=".",F="Change",E="getter",C="setter",H="value",N="init",K="initValue",M="readOnly",G="writeOnce",D="validator",R="published",P={published:true},L,Q=B.EventTarget;function A(){this._ATTR_E_CFG={queuable:false,defaultFn:this._defAttrChangeFn,silent:true};this._ATTR_E_FACADE={};Q.call(this,{emitFacade:true});this._conf=new B.State();}A.INVALID_VALUE={};L=A.INVALID_VALUE;A.prototype={addAttr:function(S,O){if(!this.attrAdded(S)){O=O||{};var U,T=(H in O);if(T){U=O.value;delete O.value;}O[N]=true;this._conf.addAll(S,O);if(T){this.set(S,U);}}else{}return this;},attrAdded:function(O){return !!(this._conf.get(O,N));},removeAttr:function(O){this._conf.remove(O);},get:function(T){var S=this._conf,U,O,V;if(T.indexOf(J)!==-1){U=T.split(J);T=U.shift();}V=S.get(T,H);O=S.get(T,E);V=(O)?O.call(this,V):V;V=(U)?I.getValue(V,U):V;return V;},set:function(O,T,S){return this._setAttr(O,T,S);},reset:function(S){if(S){this._set(S,this._conf.get(S,K));}else{var O=this._conf.data.initValue;B.each(O,function(T,U){this._set(U,T);},this);}return this;},_set:function(O,T,S){return this._setAttr(O,T,S,true);},_setAttr:function(S,V,O,T){var X=true,a=this._conf,Y=a.data,W,Z,b,U;if(S.indexOf(J)!==-1){Z=S;b=S.split(J);S=b.shift();}W=(!Y.value||!(S in Y.value));if(!this.attrAdded(S)){}else{if(!W&&!T){if(a.get(S,G)){X=false;}if(a.get(S,M)){X=false;}}if(X){U=this.get(S);if(b){V=I.setValue(B.clone(U),b,V);if(V===undefined){X=false;}}if(X){if(W){this._setAttrVal(S,Z,U,V);}else{this._fireAttrChange(S,Z,U,V,O);}}}}return this;},_fireAttrChange:function(U,Y,X,T,W){var O=U+F,S=this._conf,V;if(!S.get(U,R)){this.publish(O,this._ATTR_E_CFG);S.add(U,R,true);}V=(W)?B.merge(W):this._ATTR_E_FACADE;V.type=O;V.attrName=U;V.subAttrName=Y;V.prevVal=X;V.newVal=T;this.fire(V);},_defAttrChangeFn:function(O){if(!this._setAttrVal(O.attrName,O.subAttrName,O.prevVal,O.newVal)){O.stopImmediatePropagation();}else{O.newVal=this._conf.get(O.attrName,H);}},_setAttrVal:function(a,Z,U,T){var W=true,Y=this._conf,O=Y.get(a,D),V=Y.get(a,C),X,S;if(!O||O.call(this,T)){if(V){S=V.call(this,T);if(S===L){W=false;}else{if(S!==undefined){T=S;}}}if(W){if(!Z&&T===U){W=false;}else{if(Y.get(a,K)===undefined){Y.add(a,K,T);}Y.add(a,H,T);}}}else{W=false;}return W;},setAttrs:function(S){for(var O in S){if(S.hasOwnProperty(O)){this.set(O,S[O]);}}return this;},getAttrs:function(U){var X={},V,S,O,W,T=(U===true);U=(U&&!T)?U:I.keys(this._conf.data[H]);for(V=0,S=U.length;V<S;V++){O=U[V];W=this.get(O);if(!T||this._conf.get(O,H)!=this._conf.get(O,K)){X[O]=this.get(O);}}return X;},addAttrs:function(S,T){if(S){var O,U,V;T=this._splitAttrVals(T);for(O in S){if(S.hasOwnProperty(O)){U=S[O];V=this._getAttrInitVal(O,U,T);if(V!==undefined){U.value=V;}this.addAttr(O,U);}}}return this;},_splitAttrVals:function(U){var W={},V={},X,O,T,S;for(S in U){if(U.hasOwnProperty(S)){if(S.indexOf(J)!==-1){X=S.split(J);O=X.shift();T=V[O]=V[O]||[];T[T.length]={path:X,value:U[S]};}else{W[S]=U[S];}}}return{simple:W,complex:V};},_getAttrInitVal:function(Y,W,a){var S=(W.valueFn)?W.valueFn.call(this):W.value,O,T,V,U,b,Z,X;if(!W[M]&&a){O=a.simple;if(O&&O.hasOwnProperty(Y)){S=O[Y];}T=a.complex;if(T&&T.hasOwnProperty(Y)){X=T[Y];for(V=0,U=X.length;V<U;++V){b=X[V].path;Z=X[V].value;I.setValue(S,b,Z);}}}return S;}};B.mix(A,Q,false,null,1);B.Attribute=A;},"@VERSION@",{requires:["event-custom"]});