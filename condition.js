Exit code: 0
Wall time: 0.4 seconds
Output:
const Conditions = (() => {
  /** Build cumulative game/medal points, including compatibility with old data. */
  function points(history) {
    let games = 0;
    return [{ games: 0, total: 0 }, ...history.map((h) => {
      games += Number(h.games) || 0;
      return { games: h.totalGames ?? games, total: Number(h.total) || 0 };
    })];
  }
  /** Return the interpolated medal total at a particular cumulative game count. */
  function medalsAtGame(history, game) {
    const data = points(history);
    for (let i = 1; i < data.length; i += 1) {
      if (game <= data[i].games) {
        const before = data[i - 1]; const after = data[i];
        const ratio = (game - before.games) / (after.games - before.games || 1);
        return before.total + (after.total - before.total) * Math.max(0, ratio);
      }
    }
    return data.at(-1).total;
  }
  /** Evaluate every condition over the moving interval ending at the latest total games. */
  function evaluate(conditions, history) {
    const end = points(history).at(-1);
    return conditions.map((condition, index) => {
      const interval = Number(condition.interval ?? ((condition.end || 0) - (condition.start || 0))) || 0;
      const startGames = Math.max(0, end.games - interval);
      const startTotal = medalsAtGame(history, startGames);
      const delta = end.total - startTotal;
      const remaining = Math.max(0, condition.target - delta);
      const status = delta >= condition.target ? '達成' : (delta >= condition.target * 0.8 ? '近い' : '未達');
      return { ...condition, index, interval, startGames, currentGames: end.games, startTotal, endTotal: end.total, delta, remaining, status };
    });
  }
  return { evaluate, points };
})();

