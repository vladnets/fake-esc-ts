(()=>{"use strict";var t={336:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Entity=void 0;e.Entity=function(t,e,n){void 0===e&&(e=null),void 0===n&&(n=-1),this.id=t,this.container=e,this.index=n}},263:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.EntityContainer=void 0;var n=function(){function t(t,e,n){var r=this;this.sign=t,this.types=e,this.typeManager=n,this.count=0,this.entities=[],this.components=[],this.types.forEach((function(t){if(!r[t.id]){var e=[];r.components.push(e),r[t.id]=e}}))}return t.prototype.addEntity=function(t,e,n){var r=this,i=this.count;return i<this.entities.length?(this.entities[i]=t,e.forEach((function(t,e){r[t.id]&&(r[t.id][i]=n[e])}))):(this.entities.push(t),e.forEach((function(t,e){r[t.id]&&r[t.id].push(n[e])}))),t.index=i,t.container=this,this.count++,i},t.prototype.removeEntity=function(t){var e,n=this.count-1;return e=t.index===n?this._removeLast():this._swapWithLast(t.index),t.index=-1,t.container=null,this.count--,e},t.prototype.getComponent=function(t){return this[this.typeManager.getType(t).id]},t.prototype._removeLast=function(){var t=this.count-1;this.entities[t]=null;for(var e=[],n=this.types.length,r=0;r<n;r++){var i=this.components[r];e.push(i[t]),i[t]=null}return e},t.prototype._swapWithLast=function(t){var e=this.count-1,n=this.entities[e];this.entities[t]=n,this.entities[e]=null;for(var r=[],i=this.types.length,o=0;o<i;o++){var s=this.components[o];r.push(s[t]),s[t]=s[e],s[e]=null}return n.index=t,r},t}();e.EntityContainer=n},755:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.EntityContainerManager=void 0;var r=n(263),i=function(){function t(t){this.typeManager=t,this.signManager=this.typeManager.signManager,this.containers=[],this.containersMap={},this._init()}return t.prototype.create=function(t,e){var n=new r.EntityContainer(t,e,this.typeManager);return this.addContainer(n),n},t.prototype.addContainer=function(t){for(var e=this.containersMap,n=t.sign,r=0;r<n.parts.length-1;r++){var i=n.parts[r];e[i]||(e[i]={}),e=e[i]}this.containers.push(t),e[n.parts[n.parts.length-1]]=t},t.prototype.getContainer=function(t){for(var e=this.containersMap,n=0;n<t.parts.length;n++){var r=t.parts[n];if(!e[r])return;e=e[r]}return e},t.prototype._init=function(){},t}();e.EntityContainerManager=i},743:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.EntityManager=void 0;var r=n(755),i=n(461),o=n(375),s=n(269),a=function(){function t(t){this._entities=[],this._entitiesPool=[],this._queries=[],this._typeManager=t,this._signManager=t.signManager,this._containerManager=new r.EntityContainerManager(this._typeManager);var e={entities:this._entities,entitiesPool:this._entitiesPool,queries:this._queries,typeManager:this._typeManager,signManager:this._signManager,containerManager:this._containerManager};this._entityExt=new i.EntityExtension(e),this._componentsExt=new o.ComponentsExtension(e),this._queryExt=new s.QueryExtension(e)}return t.prototype.registerComponent=function(t){this._typeManager.register(t)},t.prototype.createEntity=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return this._entityExt.createEntity(t)},t.prototype.removeEntity=function(t){this._entityExt.removeEntity(t)},t.prototype.setComponents=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];this._componentsExt.setComponents(t,e)},t.prototype.removeComponents=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];this._componentsExt.removeComponents(t,e)},t.prototype.createQuery=function(t,e){return this._queryExt.createQuery(t,e)},t}();e.EntityManager=a},722:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.EntityQuery=void 0;var n=function(){function t(t,e){this.includeSign=t,this.excludeSign=e,this.containers=[]}return t.prototype.tryAddContainer=function(t){return!(!t.sign.includes(this.includeSign)||!t.sign.excludes(this.excludeSign)||(this.containers.push(t),0))},t}();e.EntityQuery=n},319:function(t,e){var n=this&&this.__spreadArray||function(t,e){for(var n=0,r=e.length,i=t.length;n<r;n++,i++)t[i]=e[n];return t};Object.defineProperty(e,"__esModule",{value:!0}),e.Sign=void 0;var r=function(){function t(t){this.parts=t}return t.prototype.includes=function(t){return this.parts.every((function(e,n){var r=t.parts[n];return(e&r)===r}))},t.prototype.excludes=function(t){return this.parts.every((function(e,n){return 0==(e&t.parts[n])}))},t.prototype.clone=function(){return new t(n([],this.parts))},t.prototype.addTypes=function(t){var e=this;t.forEach((function(t){t.sign.parts.forEach((function(t,n){var r=e.parts[n]&t;e.parts[n]+=t-r}))}))},t}();e.Sign=r},801:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.SignManager=void 0;var r=n(319),i=function(){function t(t){this.signPartsCount=t}return t.prototype.createEmpty=function(){for(var t=[],e=this.signPartsCount,n=0;n<e;n++)t.push(0);return new r.Sign(t)},t.prototype.createFromTypes=function(t){var e=this.createEmpty();return e.addTypes(t),e},t}();e.SignManager=i},150:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Type=void 0;e.Type=function(t,e){this.id=t,this.sign=e}},378:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.TypeManager=void 0;var r=n(150),i=function(){function t(t){this.registry=new WeakMap,this.signManager=t,this.nextId=0,this.nextPart=2,this.nextPartIndex=0,this.halfMaxPart=Math.pow(2,30)/2}return t.prototype.getType=function(t){return this.registry.get(t)},t.prototype.register=function(t){var e=this.registry.get(t);if(e)return e;var n=this.signManager.createEmpty();n.parts[this.nextPartIndex]=this.nextPart;var i=new r.Type(this.nextId,n);return this.registry.set(t,i),this.nextPart>this.halfMaxPart?(this.nextPart=2,this.nextPartIndex++):this.nextPart*=2,this.nextId++,i},t}();e.TypeManager=i},375:function(t,e,n){var r,i=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__spreadArray||function(t,e){for(var n=0,r=e.length,i=t.length;n<r;n++,i++)t[i]=e[n];return t};Object.defineProperty(e,"__esModule",{value:!0}),e.ComponentsExtension=void 0;var s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.setComponents=function(t,e){var n=this.entities[t],r=n.container,i=this._getTypesFromValues(e),s=r.types,a=o(o([],i),s),u=this.signManager.createFromTypes(a),p=this._findOrCreateContainer(u,a),c=r.removeEntity(n),h=o(o([],e),c);p.addEntity(n,a,h)},e.prototype.removeComponents=function(t,e){var n=this.entities[t],r=n.container,i=this._getTypesFromConstructors(e),o=r.types,s=o.filter((function(t){return!i.includes(t)})),a=this.signManager.createFromTypes(s),u=this._findOrCreateContainer(a,s),p=r.removeEntity(n);u.addEntity||console.log(a,s,this),u.addEntity(n,o,p)},e}(n(207).ExtensionBase);e.ComponentsExtension=s},461:function(t,e,n){var r,i=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.EntityExtension=void 0;var o=n(336),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.createEntity=function(t){var e=this._createOrReuseEntity(),n=this._getTypesFromValues(t),r=this.signManager.createFromTypes(n);return this._findOrCreateContainer(r,n).addEntity(e,n,t),e.id},e.prototype.removeEntity=function(t){var e=this.entities[t];e.container.removeEntity(e),this.entitiesPool.push(e)},e.prototype._createOrReuseEntity=function(){var t;return this.entitiesPool.length>0?t=this.entitiesPool.pop():(t=new o.Entity(this.entities.length),this.entities.push(t)),t},e}(n(207).ExtensionBase);e.EntityExtension=s},207:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ExtensionBase=void 0;var n=function(){function t(t){this.entities=t.entities,this.entitiesPool=t.entitiesPool,this.queries=t.queries,this.typeManager=t.typeManager,this.signManager=t.signManager,this.containerManager=t.containerManager}return t.prototype._findOrCreateContainer=function(t,e){return this.containerManager.getContainer(t)||this._createContainer(t,e)},t.prototype._createContainer=function(t,e){var n=this.containerManager.create(t,e);return this.queries.forEach((function(t){return t.tryAddContainer(n)})),n},t.prototype._getTypesFromValues=function(t){var e=this;return t.map((function(t){return e.typeManager.getType(t.constructor)}))},t.prototype._getTypesFromConstructors=function(t){var e=this;return t.map((function(t){return e.typeManager.getType(t)}))},t}();e.ExtensionBase=n},269:function(t,e,n){var r,i=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.QueryExtension=void 0;var o=n(207),s=n(722),a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.createQuery=function(t,e){var n=this._getTypesFromConstructors(t),r=this._getTypesFromConstructors(e),i=this.signManager.createFromTypes(n),o=this.signManager.createFromTypes(r),a=new s.EntityQuery(i,o);return this.queries.push(a),this.containerManager.containers.forEach((function(t){return a.tryAddContainer(t)})),a},e}(o.ExtensionBase);e.QueryExtension=a}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={exports:{}};return t[r].call(o.exports,o,o.exports,n),o.exports}n(336),n(263),n(755),n(743),n(722),n(319),n(801),n(150),n(378)})();
//# sourceMappingURL=index.js.map