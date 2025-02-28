// import { toast } from "@/components/ui/use-toast"
// import { createContext, useContext, useState } from "react"
// interface CreditTransaction {
//   id: string
//   date: string
//   amount: number
//   status: string
//   compute?: string
// }

// interface ContextState {
//   credit: number
//   payments: CreditTransaction[]
// }

// interface ContextValue extends ContextState {
//   AddCredit: (amount: number) => void
//   SubstractCredit: (amount: number, compute?: string) => void
// }

// interface CreditProviderProps {
//   children: React.ReactNode // Accepts any ReactNode as children
// }

// const CreditContext = createContext<ContextState | undefined>(undefined)

// export const CreditProvider: React.FC<CreditProviderProps> = ({ children }) => {
//   const [state, setState] = useState({
//     credit: 10000,
//     payments: [
//       {
//         id: "TX001",
//         date: "Mon Jul 15 2024",
//         amount: 10000,
//         status: "Completed",
//       },
//     ],
//   })

//   const AddCredit = (amount: number) => {
//     setState((prev) => ({
//       payments: [
//         ...prev?.payments,
//         {
//           id: "TX002",
//           date: new Date().toDateString(),
//           amount,
//           status: "Completed",
//         },
//       ],

//       credit: prev?.credit + amount,
//     }))
//     localStorage.setItem("credits", (state?.credit + amount).toString())
//     localStorage.setItem(
//       "payments",
//       JSON.stringify([
//         ...state?.payments,
//         {
//           id: "TX00" + state?.payments.length + 1,
//           date: new Date().toDateString(),
//           amount,
//           status: "Completed",
//         },
//       ])
//     )
//   }

//   const SubstractCredit = (amount: number, compute?: string) => {
//     setState((prev) => ({
//       payments: [
//         ...prev?.payments,
//         {
//           id: "TX00" + (state?.payments.length + 1),
//           date: new Date().toDateString(),
//           amount: -amount,
//           status: "Compute",
//           compute,
//         },
//       ],
//       credit: prev?.credit - amount,
//     }))
//     localStorage.setItem("credits", (state?.credit - amount).toString())
//     localStorage.setItem(
//       "payments",
//       JSON.stringify([
//         ...state?.payments,
//         {
//           id: "TX00" + (state?.payments.length + 1),
//           date: new Date().toDateString(),
//           amount: -amount,
//           status: "Compute",
//           compute,
//         },
//       ])
//     )
//     toast({
//       description: "Successfully Selected Compute",
//       variant:'success'

//     })
//   }

//   const contextValue: ContextValue = {
//     ...state,
//     AddCredit,
//     SubstractCredit,
//   }

//   return (
//     <CreditContext.Provider value={contextValue}>
//       {children}
//     </CreditContext.Provider>
//   )
// }

// export const useCreditsContext = () => {
//   const context = useContext(CreditContext)
//   if (!context) {
//     throw new Error("useCredits must be used within a CreditProvider")
//   }
//   return context as ContextValue
// }
