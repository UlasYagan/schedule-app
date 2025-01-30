import { createBrowserRouter } from "react-router-dom";
import TodoWeek from "../views/TodoWeek";
import TodoList from "../views/TodoList";
import TodoMonth from "../views/TodoMonth";
import Home from "../views/Home";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <TodoWeek />,
        },
        {
          path: "/todolist",
          element: <TodoList />,
        },
        {
          path: "/todomonth",
          element: <TodoMonth />,
        },
      ],
    },
  ]);















// export const routes: RouteConfig = [
//     layout("layout/contacts.tsx", [
//       index("routes/home.tsx"),
//       route("contacts", "routes/contacts.tsx", [
//         route(":contactId", "routes/contacts/details.tsx"),
//         route(":contactId/destroy", "routes/contacts/destroy.tsx"),
//         route(":contactId/edit", "routes/contacts/edit.tsx"),
//       ]),
//     ]),
//     route("about", "routes/about.tsx"),
//   ];

// let router = createBrowserRouter([
//   {
//     path: "/",
//     Component: Root,
//     children: [
//       {
//         path: "shows/:showId",
//         Component: Show,
//         loader: ({ request, params }) =>
//           fetch(`/api/show/${params.id}.json`, {
//             signal: request.signal,
//           }),
//       },
//     ],
//   },
// ]);