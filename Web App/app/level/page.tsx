"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle2,
  XCircle,
  Clock,
  User,
  ScrollText,
  AlertCircle,
} from "lucide-react";
import axios from "@/api/axios";
import Navbar from "@/components/Navbar";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/store/userAtom";

interface Request {
  id: string;
  userId: string;
  status: "pending" | "accepted" | "rejected";
  proofOfWork: string;
  name: string;
  wing: string;
  requestId: string;
  currentLevel: string;
}

const RequestsPage = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const getRequests = async () => {
      try {
        setLoading(true);
        const wings = user.assignedWings;
        console.log(wings);
        wings.map(async (wing) => {
          const res = await axios.get(`/api/v1/requests/${wing}/pending`, {
            withCredentials: true,
          });
          setRequests([...requests, ...res.data.requests]);
        })
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRequests();
  }, []);

  const handleRequestAccept = async (id: string) => {
    try {
      const res = await axios.patch(
        `/api/v1/requests/${id}/accept`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      const newRequests = requests.filter((request) => {
        return request.requestId != id
      });
      setRequests(newRequests);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestReject = async (id: string) => {
    try {
      const res = await axios.patch(
        `/api/v1/requests/${id}/reject`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      const newRequests = requests.filter((request) => {
        return request.requestId != id
      });
      setRequests(newRequests);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-purple-500" />;
      case "accepted":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColors = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "accepted":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#9A43B1] p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-7xl">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full bg-gray-200/20">
              <CardContent className="h-32" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#9A43B1] p-4 sm:p-6 md:p-8">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <Card className="w-full mt-4 sm:mt-8 md:mt-20 border border-gray-200 shadow-lg bg-white">
          <CardHeader className="p-6 rounded-t-lg border-b border-[#9A43B1]/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Level Upgrade Requests
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Review and manage student level upgrade requests
                </p>
              </div>
              <Badge
                variant="secondary"
                className="text-sm px-3 py-1 bg-[#9A43B1]/20 text-[#9A43B1]"
              >
                {requests.length} Pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-white rounded-b-lg">
            <div className="space-y-4">
              {requests.length === 0 ? (
                <Card className="bg-gray-50 p-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <ScrollText className="h-12 w-12 text-[#9A43B1]/50" />
                    <h3 className="text-lg font-medium text-gray-800">
                      No requests found
                    </h3>
                    <p className="text-gray-600">
                      There are no pending level upgrade requests at this time.
                    </p>
                  </div>
                </Card>
              ) : (
                requests.map((request) => (
                  <Card
                    key={request.id}
                    className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
                        <div className="space-y-4 flex-1">
                          <div className="flex flex-wrap items-start gap-3">
                            <div className="flex items-center space-x-2">
                              <User className="h-5 w-5 text-[#9A43B1]" />
                              <h3 className="font-semibold text-gray-800">
                                {request.name}
                              </h3>
                            </div>
                            <Badge
                              className={`px-3 py-1 border ${getStatusColors(
                                request.status
                              )}`}
                            >
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(request.status)}
                                <span>
                                  {request.status.charAt(0).toUpperCase() +
                                    request.status.slice(1)}
                                </span>
                              </div>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            {request.wing} • Level {request.currentLevel} →{" "}
                            {request.currentLevel + 1}
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Proof of Work
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {request.proofOfWork}
                            </p>
                          </div>
                        </div>

                        {request.status === "pending" && (
                          <div className="flex flex-row sm:flex-col md:flex-row gap-3 w-full sm:w-auto">
                            <Button
                              variant="outline"
                              className="flex-1 sm:flex-none bg-green-50 hover:bg-green-100 text-green-700 border-green-200 hover:border-green-300 h-10"
                              onClick={() => {
                                handleRequestAccept(request.requestId);
                              }}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2 shrink-0" />
                              <span>Accept</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 sm:flex-none bg-red-50 hover:bg-red-100 text-red-700 border-red-200 hover:border-red-300 h-10"
                              onClick={() => {
                                handleRequestReject(request.requestId);
                              }}
                            >
                              <XCircle className="h-4 w-4 mr-2 shrink-0" />
                              <span>Reject</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestsPage;
