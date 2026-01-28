// // 이전 수요일
// export const getLastWednesday = () => {
//   const today = new Date();
//   const dayOfWeek = today.getDay();
//   const wednesday = 3;

//   const diff = (dayOfWeek - wednesday + 7) % 7 || 7;

//   const lastWednesday = new Date(today);
//   lastWednesday.setDate(today.getDate() - diff);

//   return lastWednesday;
// };

// // 다음 수요일
// export const getNextWednesday = () => {
//   const today = new Date();
//   const dayOfWeek = today.getDay();
//   const wednesday = 3;

//   const diff = (wednesday - dayOfWeek + 7) % 7 || 7;

//   const nextWednesday = new Date(today);
//   nextWednesday.setDate(today.getDate() + diff);

//   return nextWednesday;
// };

export const getWednesdayRange = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const wednesday = 3;

  const hour = now.getHours();
  const minute = now.getMinutes();

  const isAfterSix = hour > 6 || (hour === 6 && minute >= 1);

  let baseWednesday = new Date(now);

  if (dayOfWeek === wednesday) {
    if (isAfterSix) {
      baseWednesday = new Date(now);
    } else {
      baseWednesday.setDate(now.getDate() - 7);
    }
  } else {
    const diff = (dayOfWeek - wednesday + 7) % 7;
    baseWednesday.setDate(now.getDate() - diff);
  }
  const lastWednesday = new Date(baseWednesday);
  const nextWednesday = new Date(baseWednesday);
  nextWednesday.setDate(baseWednesday.getDate() + 7);
  return { lastWednesday, nextWednesday };
};

export const getWeeklyResetBase = () => {
  const now = new Date();
  const day = now.getDay();
  const diff = day >= 3 ? day - 3 : day + 4;

  const wednesday = new Date(now);
  wednesday.setDate(now.getDate() - diff);
  wednesday.setHours(10, 0, 0, 0);

  if (now < wednesday) {
    wednesday.setDate(wednesday.getDate() - 7);
  }

  return wednesday.getTime();
};
