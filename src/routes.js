// Main Pages
import Home from "./pages/Home.svelte";
import Info from "./pages/Info.svelte";
import Projects from "./pages/Projects.svelte";
import Contact from './pages/Contact.svelte';
import Project from './pages/projects/Project.svelte';
// 404
import Error from "./pages/Error.svelte";

export const routes = {
  "/": Home,
  "/info": Info,
  "/projects/:title" : Project,
  "/projects": Projects,
  "/contact": Contact,
  "*": Error,
};


