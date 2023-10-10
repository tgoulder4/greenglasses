"use client";
import { merriweather } from "@/app/fonts";
import { Button } from "../../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef, memo } from "react";
import { Loader2 } from "lucide-react";
function NewUserQ({
  setTitle = () => {},
  setMessages,
  addMessage = () => {},
  content = "",
  _closed = false,
  className,
  ...props
}: {
  addMessage?: Function;
  setMessages?: Function;
  setTitle?: Function;
  content?: string;
  className?: string;
  initialQuestion?: boolean;
  _closed?: boolean;
}) {
  const [newContent, setNewContent] = useState(content);
  const [closed, setClosed] = useState<boolean>(_closed);
  const [loading, setLoading] = useState<boolean>(true);
  const questionRef = useRef<HTMLTextAreaElement>(null);
  function reply() {
    addMessage({
      type: "Response",
      content: "Test content.",
    });
  }
  useEffect(() => {
    setLoading(false);
    questionRef.current?.focus();
  }, [loading]);

  function submitQuestion() {
    setTitle(`The Bourbon Monarchs`);
    setClosed(true);
    reply();
  }
  return (
    <>
      <div
        className={`${className} animate-in slide-in-from-bottom-4 w-full bg-primary p-8 rounded-t-[30px] rounded-bl-[30px] flex justify-between gap-3 h-72`}
        {...props}
      >
        {!loading ? (
          <>
            {closed ? (
              <>
                <h2
                  className={`max-w-[75%] w-full text-2xl p-1 text-primary-foreground ${merriweather.className} font-[400] tracking-[-0.374px]`}
                >
                  {/* suggested Question goes here */}
                  {newContent}
                </h2>
              </>
            ) : (
              <>
                <Textarea
                  id={`questionInput`}
                  ref={questionRef}
                  placeholder={content}
                  className={`h-fit p-1 bg-primary border-primary/80 ring-0 text-white w-full max-w-[75%] text-2xl placeholder:text-[#135632] placeholder:font-bold ${merriweather.className} font-[400]  tracking-[-0.374px]`}
                  onChange={(e) => {
                    setNewContent(e.target.value);
                  }}
                  value={newContent}
                />
                <div className="flex flex-col gap-3">
                  <div className="flex justify-end w-full">
                    <Button
                      variant="grey"
                      icon="/arrow_dark.png"
                      tooltip="Submit answer"
                      onClick={submitQuestion}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <Loader2 className="animate-spin" color="#FFFFFF" />
          </>
        )}
      </div>
    </>
  );
}

export default NewUserQ;
