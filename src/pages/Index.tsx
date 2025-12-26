import { Helmet } from "react-helmet-async";
import { ZenBreath } from "@/components/ZenBreath";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Calm Breath Cycle - 4-7-8 Breathing Exercise</title>
        <meta
          name="description"
          content="A calming 4-7-8 breathing exercise app to reduce anxiety and promote relaxation. Breathe in for 4 seconds, hold for 7, exhale for 8."
        />
        <meta name="theme-color" content="#0f172a" />
      </Helmet>
      <ZenBreath />
    </>
  );
};

export default Index;
