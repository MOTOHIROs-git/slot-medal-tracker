Exit code: 0
Wall time: 0.4 seconds
Output:
const Csv = (() => {
  const headers=['No','ゲーム数','純増','増減枚数','累積枚数','日時'];
  function escape(v){return '"'+String(v??'').replaceAll('"','""')+'"';}
  /** Downloads session history as a UTF-8 BOM CSV. */
  function exportHistory(history){const rows=history.map((h,i)=>[i+1,h.games,h.rate,h.delta,h.total,h.date].map(escape).join(','));const blob=new Blob(['\uFEFF'+headers.join(',')+'\n'+rows.join('\n')],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='medal-history.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
  /** Parse CSV produced by this application; quoted commas are supported. */
  function parse(text){const lines=text.replace(/^\uFEFF/,'').trim().split(/\r?\n/);if(lines.length<2) return [];const cells=line=>{const out=[];let match;const re=/(?:^|,)(?:"((?:[^"]|"")*)"|([^,]*))/g;while((match=re.exec(line)))out.push((match[1]??match[2]).replaceAll('""','"'));return out;};return lines.slice(1).map(line=>{const c=cells(line);return {games:Number(c[1]),rate:Number(c[2]),delta:Number(c[3]),total:Number(c[4]),date:c[5]||new Date().toLocaleString('ja-JP'),id:crypto.randomUUID()};}).filter(h=>Number.isFinite(h.games)&&Number.isFinite(h.total));}
  return {exportHistory,parse};
})();

