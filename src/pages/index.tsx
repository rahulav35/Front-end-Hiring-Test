/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";

import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Operation from "@/components/Operation";

type state = "const" | "args" | "and" | "or" | "";
type ops = {
  id: any;
  value: boolean | null;
  state: state;
};

export default function Home() {
  const [args, setargs] = useState<any[]>([]);
  const [dropdownState, setdropdownState] = useState<state>("");

  const [result, setResult] = useState<boolean | undefined>(undefined);
  const [ops, setOps] = useState<ops[]>([
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

  useEffect(() => {
    setargs([
      {
        name: "My Arg",
        id: uuidv4(),
        value: false,
      },
    ]);
  }, []);

  useEffect(() => {
    let result: boolean = ops[0]?.value ?? (true as boolean);
    for (let i = 0; i < ops.length; i++) {
      if (ops[i].state === "and") {
        result = result && (ops[i].value as boolean);
      } else {
        result = result || (ops[i].value as boolean);
      }
    }

    console.log(result);
    if (
      dropdownState !== "" &&
      ops[0]?.value !== null &&
      ops[1]?.value !== null
    ) {
      setResult(result !== null ? result : undefined);
    } else {
      setResult(undefined);
    }
  }, [ops, args]);

  const getOps = useCallback(() => {
    if (args.length !== 0) {
      return args.map((item, i) => (
        <option key={i} value={item?.value}>
          {item?.name}
        </option>
      ));
    } else {
      return null;
    }
  }, [args]);

  const RenderDropDowns = () => {
    switch (dropdownState) {
      case "const":
        return (
          <div className="flex items-center justify-center my-4 ">
            <select
              onChange={(e) => setResult(e.target.value.includes("true"))}
              className="w-[130px] h-[40px] rounded-md border-2 border-indigo-300 p-2 box-border  "
              name="constants"
              id="ops"
            >
              <option value={""}>constants</option>
              <option value={"true"}>true</option>
              <option value={"false"}>false</option>
            </select>
            <button
              onClick={() => setdropdownState("")}
              className="flex items-center justify-center  bg-indigo-100 rounded-md h-[40px] w-[40px] mx-4"
            >
              <FaPlus className="rotate-45" color="black" size={18} />
            </button>
          </div>
        );
      case "args":
        return (
          <div className="flex items-center justify-center my-4">
            <select
              onChange={(e) => setResult(e.target.value.includes("true"))}
              className="w-[130px] h-[40px] border-2 border-indigo-300 p-2 box-border rounded-md"
              name="args"
              id="ops"
            >
              <option value={""}>Argument</option>
              {getOps()}
            </select>
            <button
              onClick={() => setdropdownState("")}
              className="flex items-center justify-center  bg-indigo-100 rounded-md h-[40px] w-[40px] mx-4"
            >
              <FaPlus className="rotate-45" color="black" size={18} />
            </button>
          </div>
        );
      case "and":
        return (
          <div className="flex items-center justify-center my-4">
            <select
              defaultValue={"and"}
              onChange={(e) => setdropdownState(e.target.value as state)}
              className="w-[130px] h-[40px] border-2 border-indigo-300 p-2 box-border rounded-md"
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
              className="w-[130px] h-[40px] border-2 border-indigo-300 p-2 box-border rounded-md"
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
              className="flex items-center justify-center bg-indigo-100 rounded-md h-[40px] w-[40px]"
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
            <option value={"true"}>true</option>
            <option value={"false"}>false</option>
          </select>
        );
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Hiring Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-[70%] h-[80%] flex flex-col items-start justify-start  ">
        {args.map((item, i) => (
          <div key={i} className="flex items-center justify-center mt-2">
            <input
              value={item?.name}
              placeholder={item?.name}
              onChange={(e) =>
                setargs(
                  args.map((val) =>
                    val.id === item.id ? { ...val, name: e.target.value } : val
                  )
                )
              }
              type="text"
              className="border-2 border-indigo-300 rounded-md h-[40px] w-[190px] placeholder:text-black pl-2 box-border text-[15px] font-sans"
            />
            <select
              onChange={(e) =>
                setargs(
                  args.map((val) =>
                    val.id === item.id
                      ? { ...val, value: e.target.value.includes("true") }
                      : val
                  )
                )
              }
              className="w-[100px] h-[40px] mx-2 rounded-md p-2 box-border bg-blue-200 "
              name="false"
              id="ops"
            >
              <option value={""}>select</option>
              <option value={"false"}>false</option>
              <option value={"true"}>true</option>
            </select>
          </div>
        ))}
        <button
          onClick={() => {
            setargs([
              ...args,
              { id: uuidv4(), name: "My Arg", value: undefined },
            ]);
          }}
          className="self-start w-[160px] h-[40px] bg-indigo-300 my-4 rounded-lg font-mono"
        >
          + add arg
        </button>

        <div className="flex items-center justify-center">
          {dropdownState === "" ? (
            <div className="flex items-center justify-center my-4">
              <select
                placeholder="Select"
                onChange={(e) => setdropdownState(e.target.value as state)}
                className="w-[130px] h-[40px] border-2 border-indigo-300 p-2 box-border rounded-md"
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
                className="flex items-center justify-center bg-indigo-100 h-[40px] w-[40px] mx-4 rounded-md"
              >
                <FaPlus className="rotate-45" color="black" size={18} />
              </button>
            </div>
          ) : (
            <RenderDropDowns />
          )}
        </div>
        <div className="flex flex-col items-center justify-start">
          {dropdownState === "and" && (
            <div className="flex flex-col items-center justify-start">
              {ops.map((item, i) => (
                <Operation
                  key={i}
                  getOps={getOps}
                  onClose={() =>
                    setOps(ops.filter((val) => val.id !== item.id))
                  }
                  ops={ops}
                  setOps={setOps}
                  item={item}
                />
              ))}
              <button
                onClick={() =>
                  setOps([
                    ...ops,
                    {
                      id: uuidv4(),
                      value: null,
                      state: dropdownState,
                    },
                  ])
                }
                className="self-start w-[160px] h-[40px] bg-indigo-300"
              >
                + add ops
              </button>
            </div>
          )}
          {dropdownState === "or" && (
            <div className="flex flex-col items-center justify-start">
              {ops.map((item, i) => (
                <Operation
                  key={i}
                  getOps={getOps}
                  onClose={() =>
                    setOps(ops.filter((val) => val.id !== item.id))
                  }
                  ops={ops}
                  setOps={setOps}
                  item={item}
                />
              ))}
              <button
                onClick={() =>
                  setOps([
                    ...ops,
                    {
                      id: uuidv4(),
                      value: null,
                      state: dropdownState,
                    },
                  ])
                }
                className="self-start w-[160px] h-[40px] bg-indigo-300"
              >
                + add ops
              </button>
            </div>
          )}
        </div>
        <h1 className="text-black mt-2 font-mono ">
          {" "}
          Result :
          <span
            className={`${
              result === undefined ? "text-black" : "text-violet-900"
            }`}
          >
            {" "}
            {result === undefined ? "undefined" : result.toString()}
          </span>
        </h1>
      </div>
    </div>
  );
}
