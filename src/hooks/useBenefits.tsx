import DiamondIcon from "@mui/icons-material/Diamond";
import { useTranslation } from "react-i18next";

export function useBenifits() {
  const { t } = useTranslation("common");

  const fastExecution = t("fast_execution");
  const fastExecutionDescription = t("fast_execution_description");
  const advancedChartingTools = t("advanced_charting_tools");
  const advancedChartingToolsDescription = t(
    "advanced_charting_tools_description"
  );
  const comprehensiveMarketCoverage = t("comprehensive_market_coverage");
  const comprehensiveMarketCoverageDescription = t(
    "comprehensive_market_coverage_description"
  );
  const advancedSecurityMeasures = t("advanced_security_measures");
  const advancedSecurityMeasuresDescription = t(
    "advanced_security_measures_description"
  );

  const benefits: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      title: fastExecution,
      icon: <DiamondIcon />,
      description: fastExecutionDescription,
    },
    {
      title: advancedChartingTools,
      icon: <DiamondIcon />,
      description: advancedChartingToolsDescription,
    },
    {
      title: comprehensiveMarketCoverage,
      icon: <DiamondIcon />,
      description: comprehensiveMarketCoverageDescription,
    },
    {
      title: advancedSecurityMeasures,
      icon: <DiamondIcon />,
      description: advancedSecurityMeasuresDescription,
    },
  ];

  return benefits;
}
