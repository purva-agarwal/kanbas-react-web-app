import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaArrowDown, FaCaretDown, FaCaretRight, FaLink } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
} from "./reducer";
import { KanbasState } from "../../store";
function ModuleList() {
  type Module = {
    _id: string;
    name: string;
    lessons?: { _id: string; name: string }[];
    course: string;
  };
  const { courseId } = useParams();
  const modulesList = modules.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState<Module | null>(modulesList[0]);
  const toggleModule = (module: Module) => {
    setSelectedModule((prevModule) => (prevModule === module ? null : module));
  };
  const moduleList = useSelector((state: KanbasState) => 
    state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) => 
    state.modulesReducer.module);
  const dispatch = useDispatch();

  return (
    <>
        <div>
        <button className="btn btn-outline-secondary">Collapse All</button>
        <button className="btn btn-outline-secondary">View Progress</button>
        <button className="btn btn-outline-secondary"><FaCheckCircle className="text-success"/>
        <select style={{border: 0}}>
            <option>Publish All</option>
            <option>Unpublish All</option>
            <option>Unpublish All</option>
        </select>
        </button>
        <button className="btn btn-danger"> + Module</button>
        <button className="btn btn-outline-secondary"><FaEllipsisV/></button>
      </div>
      <hr/>
      <ul className="list-group wd-modules">
      <li className="list-group-item">
      <button onClick={() => dispatch(addModule({ ...module, course: courseId }))}>
           Add
        </button>
        <button onClick={() => dispatch(updateModule(module))}>
          Update
        </button>
        <input
          value={module.name}
          onChange={(e) =>
            dispatch(setModule({ ...module, name: e.target.value }))
          }/>
        <textarea
          value={module.description}
          onChange={(e) =>
            dispatch(setModule({ ...module, description: e.target.value }))
          }/>
      </li>
        {modulesList
        .filter((module) => module.course === courseId)
        .map((module) => (
          <li
            className="list-group-item"
            onClick={() => toggleModule(module)}>
            <button
              onClick={() => dispatch(setModule(module))}>
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteModule(module._id))}>
              Delete
            </button>
            <div>
              <FaEllipsisV className="me-2" />
              {selectedModule === module ? (
                <FaCaretDown className="me-2" />
              ) : (
                <FaCaretRight className="me-2" />
              )}
              {module.name}
              <p>{module.description}</p>
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaCaretDown className="ms-2" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            {selectedModule === module && (
              <ul className="list-group">
                {module.lessons?.map((lesson) => (
                  <li className="list-group-item">
                    <FaEllipsisV className="me-2" />
                    <FaLink className="me-2"/>
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ModuleList;