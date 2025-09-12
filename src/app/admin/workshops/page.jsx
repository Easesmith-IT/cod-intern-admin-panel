"use client";

import { TypographyH2 } from "@/components/typography/typography-h2";
import { Button } from "@/components/ui/button";
import { WorkshopClient } from "@/components/workshops/workshop-client";
import Link from "next/link";
import { useState } from "react";

const Workshops = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-5">
      {!isOpen && <>
        <TypographyH2 heading="Workshops" />

        <div className="grid grid-cols-2 gap-10 shadow-md bg-white p-5 rounded-sm">
          <Button
            onClick={() => setIsOpen(true)}
            variant="codIntern"
            className="h-12"
          >
            <h2 className="text-base font-inter font-semibold">
              Workshop Registrations
            </h2>
          </Button>
          <Button asChild variant="codIntern" className="h-12">
            <Link href="/admin/workshops/generative-ai">
              <h2 className="text-base font-inter font-semibold">
                Generative AI Workshop Registrations
              </h2>
            </Link>
          </Button>
        </div>
      </>}

      {isOpen && <WorkshopClient setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Workshops;
