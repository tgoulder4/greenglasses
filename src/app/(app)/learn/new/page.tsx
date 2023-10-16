"use client";
import React, { useState } from "react";
import NewUserQ from "@/components/Message/UserMsg/NewUserQ";
import { merriweather, ruda } from "@/app/fonts";
import AddMoreSources from "@/components/ui/DropzoneAndFAQ";
import Sources from "@/components/ui/Sources";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonWithoutLoadingState } from "@/components/ui/ButtonWithoutLoadingState";
type Text = {
  content: string;
  type: "New_Question" | "Question" | "Response" | "Interrogation";
  placeHolderText?: string;
};
function Thread({ setTitle }: { setTitle: Function }) {
  const messages: Array<Text> = [
    {
      type: "New_Question",
      content: "Who were the Bourbon Monarch?",
    },
  ];
  const [uploadClicked, setUploadClicked] = useState(false);
  return (
    <>
      <main
        className={`text-complementary max-w-3xl mx-auto flex flex-col gap-4 h-full w-full px-4 pt-6 pb-14`}
      >
        <h2 className={`font-black text-[2rem] ${merriweather.className}`}>
          New Question
        </h2>
        <div
          className={`flex flex-col gap-3 ${
            uploadClicked ? "pb-24" : ""
          } outline-2 outline-gray-400`}
        >
          <div className={`relative flex flex-col gap-4 `} id="cardContainer">
            <>
              <div className="w-full bg-white flex flex-col gap-3 p-8 rounded-3xl">
                {uploadClicked ? (
                  <>
                    <h2
                      className={`font-black text-[1.5rem] ${merriweather.className}`}
                    >
                      New Source
                    </h2>
                    <AddMoreSources />
                    <hr className="h-[2px]" />
                  </>
                ) : (
                  <></>
                )}
                <div className="flex justify-between" id="title">
                  <h2
                    className={`font-black text-[1.5rem] ${merriweather.className}`}
                  >
                    My Sources
                  </h2>
                  <ButtonWithoutLoadingState
                    tooltip="Add a source"
                    variant="grey"
                    onClick={() => setUploadClicked(!uploadClicked)}
                  >
                    <Plus className="h-8 w-8 " />
                  </ButtonWithoutLoadingState>
                </div>
                <div
                  id="primaryInteractionArea"
                  className="flex flex-col gap-4"
                >
                  <Sources />
                </div>
              </div>
            </>
            <NewUserQ content={messages[0].content} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Thread;
