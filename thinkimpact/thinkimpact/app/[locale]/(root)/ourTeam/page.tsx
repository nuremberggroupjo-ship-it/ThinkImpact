import React from "react";
import {
  type newMember,
  
} from "@/types/index";
import {getAllMembers} from "@/app/models/db/lib/services/outTeam"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

async function page() {
  const data: newMember[] = await getAllMembers();

  return (
    <main className="flex flex-col justify-center items-center">
      {/* Title section */}
      <section className="flex flex-col justify-center items-center text-white bg-[#125892] w-full h-[50vh]">
        <h1 className="text-center text-2xl md:text-5xl sm:text-3xl mb-7">
          Our Team
        </h1>
        <p className="text-center font-bold text-[10px] text-xs sm:text-xs md:text-2xl lg:text-2xl text-white mb-5">
          Our diverse team combines expertise, collaboration, and innovation to
          drive meaningful, sustainable impact.
        </p>
      </section>

      {/* members section */}
      <section className="flex flex-col justify-center items-center w-full md:w-[85%] sm:w-full my-10  ">
        {data.map((ele, i) => {
          const shortDescription =
            ele.description_en.length > 225
              ? ele.description_en.substring(0, 215) + "..."
              : ele.description_en;


          return (
            <div
              key={i}
              className={`md:flex md:flex-row ${
                i % 2 !== 0 ? "md:flex-row-reverse bg-[#00ADEE]" : "bg-[#125892]"
              } md:w-full md:h-48 sm:w-full sm:h-full m-10 md:justify-between md:items-center gap-3 rounded-2xl p-2 text-white`}
            >
            
              <div className="flex flex-row items-center md:hidden gap-3 mb-3">
                <div
                  className={`${
                    i % 2 !== 0 ? "border-[#125892]" : "border-[#00ADEE]"
                  } rounded-full w-24 h-24 border-4 overflow-hidden shadow-lg flex-shrink-0`}
                >
                  <img
                    src={ele.image}
                    alt={ele.name_en}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col  ">
                  <h1 className="mb-1 font-bold ">{ele.name_en}</h1>
                  <h2 className="text-xs">{ele.position_en}</h2>
                </div>
              </div>
              
           
              <div
                className={`${
                  i % 2 !== 0 ? "border-[#125892]" : "border-[#00ADEE]"
                } rounded-full hidden sm:block sm:w-40 sm:h-40 md:w-60 md:h-60 border-4 overflow-hidden shadow-lg -m-4 sm:-m-8 md:-m-15 `}
              >
                <img
                  src={ele.image}
                  alt={ele.name_en}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* name and description section */}
              <div className="flex flex-col gap-2  md:w-[85%] lg:w-[78%] xl:w-[85%] w-full p-2">
               
                <div className="md:flex md:flex-row hidden font-bold md:text-base text-sm lg:text-lg lx:text-2xl">
                  <h1 >{ele.name_en}</h1>
                  <strong className="mx-0.5">-</strong>
                  <h2 >{ele.position_en}</h2>
                </div>

                <p className=" hidden  md:block lg:block ">
                  {shortDescription}{" "}
                  {ele.description_en.length > 250 && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className={`${
                            i % 2 !== 0
                              ? " text-[#125892] border-none"
                              : " text-[#00ADEE] border-none"
                          } cursor-pointer`}
                        >
                          Learn More
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader className="flex flex-row justify-start items-center gap-2">
                          <img
                            src={ele.image}
                            alt={ele.name_en}
                            className="w-28 h-28 object-cover rounded-full"
                          />
                          <DialogTitle> {ele.name_en}
                             <DialogDescription>
                            {ele.position_en}
                          </DialogDescription>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 whitespace-pre-line text-gray-800 ">
                          {ele.description_en}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </p>
                <p className=" md:hidden mb-10">
                  {ele.description_en}
                </p>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default page;