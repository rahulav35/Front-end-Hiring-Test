/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

type state = "const" | "args" | "and" | "or" | "";

const Operation = ({
  onClose,
  onChange,
  getOps,
  setOps,
  ops,
  item,
}: {
  onClose?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  getOps?: () => JSX.Element[] | null;
  ops: any[];
  setOps: Dispatch<SetStateAction<any[]>>;
  item: any;
}) => {
  const [dropdownState, setdropdownState] = useState<state>("");

  useEffect(() => {
    if (dropdownState === "and" || dropdownState === "or") {
      setOps([
        ...ops,
        {
          id: uuidv4(),
          value: null,
          state: dropdownState,
        },
        {
          id: uuidv4(),
          value: null,
          state: dropdownState,
        },
      ]);
    }
  }, [dropdownState]);

  const RenderDropDowns = () => {
    switch (dropdownState) {
      case "const":
        return (
          <div className="flex items-center justify-center">
            <select
              value={item?.value?.toString()}
              onChange={(e) =>
                setOps(
                  ops.map((val) =>
                    val.id === item.id
                      ? { ...val, value: e.target.value.includes("true") }
                      : val
                  )
                )
              }
              className="w-[130px] h-[40px]"
              name="constants"
              id="ops"
            >
              <option value={""}>constant</option>
              <option value={"true"}>true</option>
              <option value={"false"}>false</option>
            </select>
            <button
              onClick={() => setdropdownState("")}
              className="flex items-center justify-center  bg-indigo-100 rounded-md h-[40px] w-[40px]"
            >
              <FaPlus className="rotate-45" color="black" size={18} />
            </button>
          </div>
        );
      case "args":
        return (
          <div className="flex items-center justify-center">
            <select
              placeholder="select"
              value={item?.value?.toString()}
              onChange={(e) =>
                setOps(
                  ops.map((val) =>
                    val.id === item.id
                      ? { ...val, value: e.target.value.includes("true") }
                      : val
                  )
                )
              }
              className="w-[130px] h-[40px]"
              name="args"
              id="ops"
            >
              <option value={""}>Argument</option>
              {getOps!()}
            </select>
            <button
              onClick={() => setdropdownState("")}
              className="flex items-center justify-center  bg-indigo-100 rounded-md h-[40px] w-[40px]"
            >
              <FaPlus className="rotate-45" color="black" size={18} />
            </button>
          </div>
        );
      case "and":
        return (
          <div className="flex items-center justify-center">
            <select
              defaultValue={"and"}
              onChange={(e) => setdropdownState(e.target.value as state)}
              className="w-[130px] h-[40px]"
              name="false"
              id="ops"
            >
              <option value={""}>select</option>
              <option value={"const"}>constant</option>
              <option value={"args"}>Argument</option>
              <option value={"and"}>and</option>
              <option value={"or"}>or</option>
            </select>
            <button
              onClick={() => setdropdownState("")}
              className="flex items-center justify-center  bg-indigo-100 rounded-md h-[40px] w-[40px]"
            >
              <FaPlus className="rotate-45" color="black" size={18} />
            </button>
          </div>
        );
      case "or":
        return (
          <div className="flex items-center justify-center">
            <select
              defaultValue={"or"}
              onChange={(e) => setdropdownState(e.target.value as state)}
              className="w-[130px] h-[40px]"
              name="false"
              id="ops"
            >
              <option value={""}>select</option>
              <option value={"const"}>constant</option>
              <option value={"args"}>Argument</option>
              <option value={"and"}>and</option>
              <option value={"or"}>or</option>
            </select>
            <button
              onClick={() => setdropdownState("")}
              className="flex items-center justify-center  bg-indigo-100 rounded-md h-[40px] w-[40px]"
            >
              <FaPlus className="rotate-45" color="black" size={18} />
            </button>
          </div>
        );
      default:
        return (
          <select
            onChange={(e) => null}
            className="w-[130px] h-[40px]"
            name="false"
            id="ops"
          >
            <option value={""}>select</option>
            <option value={"true"}>true</option>
            <option value={"false"}>false</option>
          </select>
        );
    }
  };

  return (
    <div className="flex items-center justify-center">
      {dropdownState === "" ? (
        <>
          <select
            onChange={(e) => setdropdownState(e.target.value as state)}
            className="w-[130px] h-[40px]"
            name="false"
            id="ops"
          >
            <option value={""}>select</option>
            <option value={"const"}>constant</option>
            <option value={"args"}>Argument</option>
            <option value={"and"}>and</option>
            <option value={"or"}>or</option>
          </select>
          <button
            onClick={onClose}
            className="flex items-center justify-center  bg-indigo-100 rounded-md h-[40px] w-[40px]"
          >
            <FaPlus className="rotate-45" color="black" size={18} />
          </button>
        </>
      ) : (
        <RenderDropDowns />
      )}
    </div>
  );
};

export default Operation;
