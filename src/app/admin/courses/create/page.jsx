"use client";

import { useState } from "react";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

// Step components
import Step1BasicInfo from "@/components/courses/create/Step1BasicInfo";
import Step2CourseDetails from "@/components/courses/create/Step2CourseDetails";
import Step3ModulesLessons from "@/components/courses/create/Step3ModulesLessons";
import Step4ProjectsBatches from "@/components/courses/create/Step4ProjectsBatches";
import Step5AdditionalDetails from "@/components/courses/create/Step5AdditionalDetails";
import Step6PublishCourse from "@/components/courses/create/Step6PublishCourse";

const CreateCourse = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    // Step 1 data
    basicInfo: {},
    // Step 2 data
    courseDetails: {},
    // Step 3 data
    modules: [],
    // Step 4 data
    extras: {},
    // Step 5 data
    additionalDetails: {},
    // Step 6 data
    publishInfo: {},
  });

  const steps = [
    {
      number: 1,
      title: "Basic Info",
      description: "Course title, description, category",
      component: Step1BasicInfo,
    },
    {
      number: 2,
      title: "Course Details",
      description: "Pricing, certificate, highlights",
      component: Step2CourseDetails,
    },
    {
      number: 3,
      title: "Modules & Lessons",
      description: "Course content and structure",
      component: Step3ModulesLessons,
    },
    {
      number: 4,
      title: "Projects & Batches",
      description: "Projects and batch scheduling",
      component: Step4ProjectsBatches,
    },
    {
      number: 5,
      title: "Additional Details",
      description: "Duration, features, materials",
      component: Step5AdditionalDetails,
    },
    {
      number: 6,
      title: "Publish Course",
      description: "Assign instructors and publish",
      component: Step6PublishCourse,
    },
  ];

  const updateCourseData = (step, data) => {
    setCourseData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => router.push("/admin/courses")}
          className="flex items-center gap-1"
        >
          <ArrowLeft />
          <TypographyH2 heading="Create New Course" />
        </button>
        <p className="text-muted-foreground ml-2">
          Follow the steps below to create your course
        </p>
      </div>

      {/* Stepper */}
      <Card>
        <CardHeader>
          <CardTitle>Course Creation Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex flex-col items-center justify-start ${
                    index < steps.length - 1 ? "flex-1" : ""
                  }`}
                  onClick={() => handleStepClick(step.number)}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      currentStep === step.number
                        ? "border-primary bg-primary text-primary-foreground"
                        : currentStep > step.number
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 bg-white text-gray-500"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="ml-3 hidden md:block text-center">
                    <div
                      className={`text-sm font-medium ${
                        currentStep >= step.number
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden md:block w-10 h-0.5 mx-1 ${
                      currentStep > step.number ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Component */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Badge variant="outline">Step {currentStep}</Badge>
                <span>{steps[currentStep - 1].title}</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {steps[currentStep - 1].description}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {currentStep} of {steps.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CurrentStepComponent
            data={courseData}
            updateData={updateCourseData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      {/* <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentStep === 6}
          className="bg-primary"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div> */}
    </div>
  );
};

export default CreateCourse;
