/* LocalStorage access is intentionally isolated so UI code stays testable. */
const Storage = (() => {
  const KEY = 'slot-medal-tracker-v1';
  /** Standard goals: total medals targeted by each cumulative game milestone. */
  const defaultConditions = () => ([{interval:400,target:1242},{interval:1600,target:2071},{interval:6000,target:4038}]);
  const defaults = () => ({theme:'auto', activeSessionId:'default', sessions:{default:{name:'メイン', rates:[2.8,3.0,4.5,-1.5], selectedRate:0, gameInput:0, history:[], conditions:defaultConditions()}}});
  /** @returns {object} Complete persisted application state. */
  function load(){try{return {...defaults(),...JSON.parse(localStorage.getItem(KEY)||'{}')};}catch{return defaults();}}
  /** @param {object} state Application state to persist. */
  function save(state){localStorage.setItem(KEY,JSON.stringify(state));}
  function clear(){localStorage.removeItem(KEY);}
  return {load,save,clear,defaults,defaultConditions};
})();

