"use client";

import { Job } from "@/components/jobs/job";
import { TypographyH2 } from "@/components/typography.jsx/typography-h2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    applications: 45,
    status: "active",
    postedDate: "2024-01-15",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "DataFlow Solutions",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $130k",
    applications: 67,
    status: "active",
    postedDate: "2024-01-12",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "Creative Studio",
    location: "New York, NY",
    type: "Contract",
    salary: "$80k - $100k",
    applications: 23,
    status: "inactive",
    postedDate: "2024-01-10",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $140k",
    applications: 34,
    status: "active",
    postedDate: "2024-01-08",
    logo: "/placeholder.svg?height=40&width=40",
  },
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <TypographyH2 heading="Job Management" />
          <p className="text-muted-foreground">
            Manage job postings, applications, and employer accounts
          </p>
        </div>
        {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              style={{ backgroundColor: "#9237E3" }}
              className="hover:opacity-90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle style={{ color: "#9237E3" }}>
                Add New Job Posting
              </DialogTitle>
              <DialogDescription>
                Create a new job posting. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="job-title" className="text-right">
                  Job Title
                </Label>
                <Input
                  id="job-title"
                  className="col-span-3"
                  placeholder="e.g. Senior Developer"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  Company
                </Label>
                <Input
                  id="company"
                  className="col-span-3"
                  placeholder="Company name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  className="col-span-3"
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="job-type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salary" className="text-right">
                  Salary Range
                </Label>
                <Input
                  id="salary"
                  className="col-span-3"
                  placeholder="e.g. $80k - $120k"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="job-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="job-description"
                  className="col-span-3"
                  placeholder="Job description and requirements..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => setIsDialogOpen(false)}
                style={{ backgroundColor: "#9237E3" }}
                className="hover:opacity-90"
              >
                Create Job Posting
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
        <Button variant="codIntern" asChild className="bg-main">
          <Link href="/admin/jobs/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              {/* <TableHead>Salary</TableHead> */}
              <TableHead>Applications</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <Job key={job.id} job={job} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Jobs;
