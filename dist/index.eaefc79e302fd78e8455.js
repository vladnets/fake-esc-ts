(()=>{"use strict";var t={336:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Entity=void 0,e.Entity=class{constructor(t,e=null,n=-1){this.id=t,this.container=e,this.index=n}}},263:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.EntityContainer=void 0,e.EntityContainer=class{constructor(t,e,n){this.sign=t,this.types=e,this.typeManager=n,this.count=0,this.entities=[],this.components=[],this.types.forEach((t=>{if(this[t.id])return;const e=[];this.components.push(e),this[t.id]=e}))}addEntity(t,e,n){const s=this.count;return s<this.entities.length?(this.entities[s]=t,e.forEach(((t,e)=>{this[t.id]&&(this[t.id][s]=n[e])}))):(this.entities.push(t),e.forEach(((t,e)=>{this[t.id]&&this[t.id].push(n[e])}))),t.index=s,t.container=this,this.count++,s}removeEntity(t){const e=this.count-1;let n;return n=t.index===e?this._removeLast():this._swapWithLast(t.index),t.index=-1,t.container=null,this.count--,n}getComponent(t){return this[this.typeManager.getType(t).id]}_removeLast(){const t=this.count-1;this.entities[t]=null;const e=[],n=this.types.length;for(let s=0;s<n;s++){const n=this.components[s];e.push(n[t]),n[t]=null}return e}_swapWithLast(t){const e=this.count-1,n=this.entities[e];this.entities[t]=n,this.entities[e]=null;const s=[],i=this.types.length;for(let n=0;n<i;n++){const i=this.components[n];s.push(i[t]),i[t]=i[e],i[e]=null}return n.index=t,s}}},755:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.EntityContainerManager=void 0;const s=n(263);e.EntityContainerManager=class{constructor(t){this.typeManager=t,this.signManager=this.typeManager.signManager,this.containers=[],this.containersMap={},this._init()}create(t,e){const n=new s.EntityContainer(t,e,this.typeManager);return this.addContainer(n),n}addContainer(t){let e=this.containersMap;const n=t.sign;for(let t=0;t<n.parts.length-1;t++){const s=n.parts[t];e[s]||(e[s]={}),e=e[s]}this.containers.push(t),e[n.parts[n.parts.length-1]]=t}getContainer(t){let e=this.containersMap;for(let n=0;n<t.parts.length;n++){const s=t.parts[n];if(!e[s])return;e=e[s]}return e}_init(){}}},743:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.EntityManager=void 0;const s=n(755),i=n(461),r=n(375),o=n(269);e.EntityManager=class{constructor(t){this._entities=[],this._entitiesPool=[],this._queries=[],this._typeManager=t,this._signManager=t.signManager,this._containerManager=new s.EntityContainerManager(this._typeManager);const e={entities:this._entities,entitiesPool:this._entitiesPool,queries:this._queries,typeManager:this._typeManager,signManager:this._signManager,containerManager:this._containerManager};this._entityExt=new i.EntityExtension(e),this._componentsExt=new r.ComponentsExtension(e),this._queryExt=new o.QueryExtension(e)}registerComponent(t){this._typeManager.register(t)}createEntity(...t){return this._entityExt.createEntity(t)}removeEntity(t){this._entityExt.removeEntity(t)}setComponents(t,...e){this._componentsExt.setComponents(t,e)}removeComponents(t,...e){this._componentsExt.removeComponents(t,e)}createQuery(t,e){return this._queryExt.createQuery(t,e)}}},722:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.EntityQuery=void 0,e.EntityQuery=class{constructor(t,e){this.includeSign=t,this.excludeSign=e,this.containers=[]}tryAddContainer(t){return!(!t.sign.includes(this.includeSign)||!t.sign.excludes(this.excludeSign)||(this.containers.push(t),0))}}},319:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Sign=void 0;class n{constructor(t){this.parts=t}includes(t){return this.parts.every(((e,n)=>{const s=t.parts[n];return(e&s)===s}))}excludes(t){return this.parts.every(((e,n)=>0==(e&t.parts[n])))}clone(){return new n([...this.parts])}addTypes(t){t.forEach((t=>{t.sign.parts.forEach(((t,e)=>{const n=this.parts[e]&t;this.parts[e]+=t-n}))}))}}e.Sign=n},801:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.SignManager=void 0;const s=n(319);e.SignManager=class{constructor(t){this.signPartsCount=t}createEmpty(){const t=[],e=this.signPartsCount;for(let n=0;n<e;n++)t.push(0);return new s.Sign(t)}createFromTypes(t){const e=this.createEmpty();return e.addTypes(t),e}}},150:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Type=void 0,e.Type=class{constructor(t,e){this.id=t,this.sign=e}}},378:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.TypeManager=void 0;const s=n(150);e.TypeManager=class{constructor(t){this.registry=new WeakMap,this.signManager=t,this.nextId=0,this.nextPart=2,this.nextPartIndex=0,this.halfMaxPart=Math.pow(2,30)/2}getType(t){return this.registry.get(t)}register(t){const e=this.registry.get(t);if(e)return e;const n=this.signManager.createEmpty();n.parts[this.nextPartIndex]=this.nextPart;const i=new s.Type(this.nextId,n);return this.registry.set(t,i),this.nextPart>this.halfMaxPart?(this.nextPart=2,this.nextPartIndex++):this.nextPart*=2,this.nextId++,i}}},375:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ComponentsExtension=void 0;const s=n(207);class i extends s.ExtensionBase{setComponents(t,e){const n=this.entities[t],s=n.container,i=[...this._getTypesFromValues(e),...s.types],r=this.signManager.createFromTypes(i),o=this._findOrCreateContainer(r,i),a=s.removeEntity(n),h=[...e,...a];o.addEntity(n,i,h)}removeComponents(t,e){const n=this.entities[t],s=n.container,i=this._getTypesFromConstructors(e),r=s.types,o=r.filter((t=>!i.includes(t))),a=this.signManager.createFromTypes(o),h=this._findOrCreateContainer(a,o),c=s.removeEntity(n);h.addEntity||console.log(a,o,this),h.addEntity(n,r,c)}}e.ComponentsExtension=i},461:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.EntityExtension=void 0;const s=n(336),i=n(207);class r extends i.ExtensionBase{createEntity(t){const e=this._createOrReuseEntity(),n=this._getTypesFromValues(t),s=this.signManager.createFromTypes(n);return this._findOrCreateContainer(s,n).addEntity(e,n,t),e.id}removeEntity(t){const e=this.entities[t];e.container.removeEntity(e),this.entitiesPool.push(e)}_createOrReuseEntity(){let t;return this.entitiesPool.length>0?t=this.entitiesPool.pop():(t=new s.Entity(this.entities.length),this.entities.push(t)),t}}e.EntityExtension=r},207:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ExtensionBase=void 0,e.ExtensionBase=class{constructor(t){this.entities=t.entities,this.entitiesPool=t.entitiesPool,this.queries=t.queries,this.typeManager=t.typeManager,this.signManager=t.signManager,this.containerManager=t.containerManager}_findOrCreateContainer(t,e){return this.containerManager.getContainer(t)||this._createContainer(t,e)}_createContainer(t,e){const n=this.containerManager.create(t,e);return this.queries.forEach((t=>t.tryAddContainer(n))),n}_getTypesFromValues(t){return t.map((t=>this.typeManager.getType(t.constructor)))}_getTypesFromConstructors(t){return t.map((t=>this.typeManager.getType(t)))}}},269:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.QueryExtension=void 0;const s=n(207),i=n(722);class r extends s.ExtensionBase{createQuery(t,e){const n=this._getTypesFromConstructors(t),s=this._getTypesFromConstructors(e),r=this.signManager.createFromTypes(n),o=this.signManager.createFromTypes(s),a=new i.EntityQuery(r,o);return this.queries.push(a),this.containerManager.containers.forEach((t=>a.tryAddContainer(t))),a}}e.QueryExtension=r}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var r=e[s]={exports:{}};return t[s](r,r.exports,n),r.exports}n(336),n(263),n(755),n(743),n(722),n(319),n(801),n(150),n(378)})();
//# sourceMappingURL=index.eaefc79e302fd78e8455.js.map