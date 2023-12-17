import Project from "./project";
import { isThisWeek, isToday } from "date-fns";

export default class ProjectManager {
  #projects;

  constructor() {
    this.#projects = [new Project("Inbox")];
  }

  getProject(index) {
    return this.#projects[index];
  }

  getAllProjects() {
    return [...this.#projects];
  }

  getUserProjects() {
    return [...this.#projects.slice(1)];
  }

  addProject(project) {
    if (this.#projects.includes(project)) return;

    this.#projects.push(project);
  }

  deleteProject(project) {
    if (
      !this.#projects.includes(project) ||
      this.#projects.indexOf(project) === 0
    )
      return;

    this.#projects.splice(this.#projects.indexOf(project), 1);
  }

  getAllTodosThisWeek() {
    return this.#filterTodos((todo) =>
      isThisWeek(todo.dueDate, { weekStartsOn: 1 })
    );
  }

  getAllTodosToday() {
    return this.#filterTodos((todo) => isToday(todo.dueDate));
  }

  #filterTodos(filterFunction) {
    let todos = [];
    for (const project of this.#projects) {
      let filteredTodos = project.todos.filter(filterFunction);

      if (filteredTodos.length === 0) continue;
      todos.push({ project: project, todos: filteredTodos });
    }

    return todos;
  }
}
