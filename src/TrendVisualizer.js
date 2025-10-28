//render horizontal bars comparing today vs tomorrow temp
export function renderTrendBar(todayTemp, tomorrowTemp) {
  const maxTemp = Math.max(todayTemp, tomorrowTemp, 30);

  // calculate width percentages for each bar
  const todayWidth = (todayTemp / maxTemp) * 100;
  const tomorrowWidth = (tomorrowTemp / maxTemp) * 100;

  // return HTML string to insert in DOM
  return `
    <h3>Temperature Comparison</h3>
    <div style="margin:8px 0; text-align:left;">
      <strong>Today:</strong>
      <div style="background:#eee; width:100%; height:12px; border-radius:6px; overflow:hidden;">
        <div style="width:${todayWidth}%; height:100%; background:skyblue;"></div>
      </div>

      <strong>Tomorrow:</strong>
      <div style="background:#eee; width:100%; height:12px; border-radius:6px; overflow:hidden;">
        <div style="width:${tomorrowWidth}%; height:100%; background:tomato;"></div>
      </div>
    </div>
  `;
}

