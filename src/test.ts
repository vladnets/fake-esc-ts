import { EntityManager } from './entities/EntityManager';
import { SignManager } from './entities/SignManager';
import { TypeManager } from './entities/TypeManager';

const ENTITIES_COUNT = (window as any).ENTITIES_COUNT || 10000;

// Component Constructor
class MoveTarget {
  constructor(
    public source: number,
    public target: number,
    public speed: number,
    public isDone: boolean = false
  ) {}
}

// Component Constructor
class MoveTargetDoneTag {}

// Component Constructor
class LoadingProgress {
  constructor(
    public readonly speed: number
  ) {}
}

// sign manager, first argument is length of sign (amount of bit masks)
const sm = new SignManager(2);
// type manager holds types of components
const tm = new TypeManager(sm);
// entity manager is root API object
const em = new EntityManager(tm);

// register components by constructor
em.registerComponent(MoveTarget);
em.registerComponent(LoadingProgress);
em.registerComponent(MoveTargetDoneTag);

// for fps
const textView = document.querySelector('#text');

// query entity with LoadingProgress and without MoveTarget
const loadingProgressQuery = em.createQuery([LoadingProgress], [MoveTarget]);

// query entity with MoveTarget and without MoveTargetDoneTag
const moveProgressQuery = em.createQuery([MoveTarget], [MoveTargetDoneTag]);

// query entity with MoveTarget and MoveTargetDoneTag
const moveDoneQuery = em.createQuery([MoveTarget, MoveTargetDoneTag], []);

let fps = 0;
// just for a test routine
let sum = 0;

// create entities
const create = () => {
  for(let i = 0; i < ENTITIES_COUNT; i++) {
    em.createEntity(new LoadingProgress(1));
  }
}

// update loadingProgressQuery, called each frame
const updateLoadings = () => {
  loadingProgressQuery.containers.forEach(container => {
    const dataArray = container.getComponent(LoadingProgress);

    for(let i = 0; i < container.count; i++) {
      const entity = container.entities[i];
      const loadOptions = dataArray[i];
      em.setComponents(entity.id, new MoveTarget(0, 1, loadOptions.speed));
    }
  });
};

// update moveProgressQuery, called each frame
const updateMove = () => {
  moveProgressQuery.containers.forEach(container => {
    const moveArray = container.getComponent(MoveTarget);

    for(let i = 0; i < container.count; i++) {
      const entity = container.entities[i];
      const move = moveArray[i];

      move.speed -= 0.05;
      sum += move.speed;


      if (move.speed <= 0) {
        move.isDone = true;
        em.setComponents(entity.id, new MoveTargetDoneTag());
      }
    }
  });
};

// update moveDoneQuery, called each frame
const updateDone = () => {
  moveDoneQuery.containers.forEach(container => {
    const moveArray = container.getComponent(MoveTarget);

    for(let i = 0; i < container.count; i++) {
      const entity = container.entities[i];
      const move = moveArray[i];

      move.source = 1;
      move.target = 0;
      move.speed = 1;
      move.isDone = false;

      em.removeComponents(entity.id, MoveTargetDoneTag);
    }
  });
};

// for fps
let startTime = Date.now();

// main tick
const update = () => {
  // kind-a systems running
  updateLoadings();
  updateMove();
  updateDone();

  // update fps in that way: fps++
  fps++;

  // fps counting
  const endTime = Date.now();
  const diff = endTime - startTime;

  if (diff >= 1000) {
    startTime = endTime;
    console.log(fps);
    textView.innerHTML = `update ${ENTITIES_COUNT} entities in ${fps}`;
    sum = 0;
    fps = 0;
  }

  // request for next frame
  requestAnimationFrame(update);
};

create();
update();

(window as any).update = update;

