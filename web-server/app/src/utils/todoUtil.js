export class todoUtil {
  static filteredTodoItems = (items, keyword, showingDone) => {
    return items?.filter((item) => {
      if (!showingDone && item.done) {
        return false;
      }
      return item.text.includes(keyword);
    });
  };
}
